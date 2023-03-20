package info4.gl.blog.web.rest;

import info4.gl.blog.repository.ProRepository;
import info4.gl.blog.service.ProService;
import info4.gl.blog.service.dto.ProDTO;
import info4.gl.blog.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link info4.gl.blog.domain.Pro}.
 */
@RestController
@RequestMapping("/api")
public class ProResource {

    private final Logger log = LoggerFactory.getLogger(ProResource.class);

    private static final String ENTITY_NAME = "pro";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProService proService;

    private final ProRepository proRepository;

    public ProResource(ProService proService, ProRepository proRepository) {
        this.proService = proService;
        this.proRepository = proRepository;
    }

    /**
     * {@code POST  /pros} : Create a new pro.
     *
     * @param proDTO the proDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proDTO, or with status {@code 400 (Bad Request)} if the pro has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pros")
    public ResponseEntity<ProDTO> createPro(@Valid @RequestBody ProDTO proDTO) throws URISyntaxException {
        log.debug("REST request to save Pro : {}", proDTO);
        if (proDTO.getId() != null) {
            throw new BadRequestAlertException("A new pro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProDTO result = proService.save(proDTO);
        return ResponseEntity
            .created(new URI("/api/pros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pros/:id} : Updates an existing pro.
     *
     * @param id the id of the proDTO to save.
     * @param proDTO the proDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proDTO,
     * or with status {@code 400 (Bad Request)} if the proDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pros/{id}")
    public ResponseEntity<ProDTO> updatePro(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody ProDTO proDTO)
        throws URISyntaxException {
        log.debug("REST request to update Pro : {}, {}", id, proDTO);
        if (proDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProDTO result = proService.update(proDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pros/:id} : Partial updates given fields of an existing pro, field will ignore if it is null
     *
     * @param id the id of the proDTO to save.
     * @param proDTO the proDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proDTO,
     * or with status {@code 400 (Bad Request)} if the proDTO is not valid,
     * or with status {@code 404 (Not Found)} if the proDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the proDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pros/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProDTO> partialUpdatePro(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ProDTO proDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Pro partially : {}, {}", id, proDTO);
        if (proDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProDTO> result = proService.partialUpdate(proDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /pros} : get all the pros.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pros in body.
     */
    @GetMapping("/pros")
    public List<ProDTO> getAllPros() {
        log.debug("REST request to get all Pros");
        return proService.findAll();
    }

    /**
     * {@code GET  /pros/:id} : get the "id" pro.
     *
     * @param id the id of the proDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pros/{id}")
    public ResponseEntity<ProDTO> getPro(@PathVariable Long id) {
        log.debug("REST request to get Pro : {}", id);
        Optional<ProDTO> proDTO = proService.findOne(id);
        return ResponseUtil.wrapOrNotFound(proDTO);
    }

    /**
     * {@code DELETE  /pros/:id} : delete the "id" pro.
     *
     * @param id the id of the proDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pros/{id}")
    public ResponseEntity<Void> deletePro(@PathVariable Long id) {
        log.debug("REST request to delete Pro : {}", id);
        proService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
