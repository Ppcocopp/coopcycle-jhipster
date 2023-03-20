package info4.gl.blog.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import info4.gl.blog.IntegrationTest;
import info4.gl.blog.domain.Pro;
import info4.gl.blog.domain.User;
import info4.gl.blog.repository.ProRepository;
import info4.gl.blog.service.dto.ProDTO;
import info4.gl.blog.service.mapper.ProMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ProResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/pros";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProRepository proRepository;

    @Autowired
    private ProMapper proMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProMockMvc;

    private Pro pro;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pro createEntity(EntityManager em) {
        Pro pro = new Pro().description(DEFAULT_DESCRIPTION);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        pro.setMail(user);
        return pro;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pro createUpdatedEntity(EntityManager em) {
        Pro pro = new Pro().description(UPDATED_DESCRIPTION);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        pro.setMail(user);
        return pro;
    }

    @BeforeEach
    public void initTest() {
        pro = createEntity(em);
    }

    @Test
    @Transactional
    void createPro() throws Exception {
        int databaseSizeBeforeCreate = proRepository.findAll().size();
        // Create the Pro
        ProDTO proDTO = proMapper.toDto(pro);
        restProMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proDTO)))
            .andExpect(status().isCreated());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeCreate + 1);
        Pro testPro = proList.get(proList.size() - 1);
        assertThat(testPro.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createProWithExistingId() throws Exception {
        // Create the Pro with an existing ID
        pro.setId(1L);
        ProDTO proDTO = proMapper.toDto(pro);

        int databaseSizeBeforeCreate = proRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPros() throws Exception {
        // Initialize the database
        proRepository.saveAndFlush(pro);

        // Get all the proList
        restProMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pro.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getPro() throws Exception {
        // Initialize the database
        proRepository.saveAndFlush(pro);

        // Get the pro
        restProMockMvc
            .perform(get(ENTITY_API_URL_ID, pro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pro.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingPro() throws Exception {
        // Get the pro
        restProMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPro() throws Exception {
        // Initialize the database
        proRepository.saveAndFlush(pro);

        int databaseSizeBeforeUpdate = proRepository.findAll().size();

        // Update the pro
        Pro updatedPro = proRepository.findById(pro.getId()).get();
        // Disconnect from session so that the updates on updatedPro are not directly saved in db
        em.detach(updatedPro);
        updatedPro.description(UPDATED_DESCRIPTION);
        ProDTO proDTO = proMapper.toDto(updatedPro);

        restProMockMvc
            .perform(
                put(ENTITY_API_URL_ID, proDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proDTO))
            )
            .andExpect(status().isOk());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeUpdate);
        Pro testPro = proList.get(proList.size() - 1);
        assertThat(testPro.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingPro() throws Exception {
        int databaseSizeBeforeUpdate = proRepository.findAll().size();
        pro.setId(count.incrementAndGet());

        // Create the Pro
        ProDTO proDTO = proMapper.toDto(pro);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(
                put(ENTITY_API_URL_ID, proDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPro() throws Exception {
        int databaseSizeBeforeUpdate = proRepository.findAll().size();
        pro.setId(count.incrementAndGet());

        // Create the Pro
        ProDTO proDTO = proMapper.toDto(pro);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPro() throws Exception {
        int databaseSizeBeforeUpdate = proRepository.findAll().size();
        pro.setId(count.incrementAndGet());

        // Create the Pro
        ProDTO proDTO = proMapper.toDto(pro);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProWithPatch() throws Exception {
        // Initialize the database
        proRepository.saveAndFlush(pro);

        int databaseSizeBeforeUpdate = proRepository.findAll().size();

        // Update the pro using partial update
        Pro partialUpdatedPro = new Pro();
        partialUpdatedPro.setId(pro.getId());

        restProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPro.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPro))
            )
            .andExpect(status().isOk());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeUpdate);
        Pro testPro = proList.get(proList.size() - 1);
        assertThat(testPro.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateProWithPatch() throws Exception {
        // Initialize the database
        proRepository.saveAndFlush(pro);

        int databaseSizeBeforeUpdate = proRepository.findAll().size();

        // Update the pro using partial update
        Pro partialUpdatedPro = new Pro();
        partialUpdatedPro.setId(pro.getId());

        partialUpdatedPro.description(UPDATED_DESCRIPTION);

        restProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPro.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPro))
            )
            .andExpect(status().isOk());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeUpdate);
        Pro testPro = proList.get(proList.size() - 1);
        assertThat(testPro.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingPro() throws Exception {
        int databaseSizeBeforeUpdate = proRepository.findAll().size();
        pro.setId(count.incrementAndGet());

        // Create the Pro
        ProDTO proDTO = proMapper.toDto(pro);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, proDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(proDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPro() throws Exception {
        int databaseSizeBeforeUpdate = proRepository.findAll().size();
        pro.setId(count.incrementAndGet());

        // Create the Pro
        ProDTO proDTO = proMapper.toDto(pro);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(proDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPro() throws Exception {
        int databaseSizeBeforeUpdate = proRepository.findAll().size();
        pro.setId(count.incrementAndGet());

        // Create the Pro
        ProDTO proDTO = proMapper.toDto(pro);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(proDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pro in the database
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePro() throws Exception {
        // Initialize the database
        proRepository.saveAndFlush(pro);

        int databaseSizeBeforeDelete = proRepository.findAll().size();

        // Delete the pro
        restProMockMvc.perform(delete(ENTITY_API_URL_ID, pro.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pro> proList = proRepository.findAll();
        assertThat(proList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
