package info4.gl.blog.service;

import info4.gl.blog.domain.Pro;
import info4.gl.blog.repository.ProRepository;
import info4.gl.blog.service.dto.ProDTO;
import info4.gl.blog.service.mapper.ProMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Pro}.
 */
@Service
@Transactional
public class ProService {

    private final Logger log = LoggerFactory.getLogger(ProService.class);

    private final ProRepository proRepository;

    private final ProMapper proMapper;

    public ProService(ProRepository proRepository, ProMapper proMapper) {
        this.proRepository = proRepository;
        this.proMapper = proMapper;
    }

    /**
     * Save a pro.
     *
     * @param proDTO the entity to save.
     * @return the persisted entity.
     */
    public ProDTO save(ProDTO proDTO) {
        log.debug("Request to save Pro : {}", proDTO);
        Pro pro = proMapper.toEntity(proDTO);
        pro = proRepository.save(pro);
        return proMapper.toDto(pro);
    }

    /**
     * Update a pro.
     *
     * @param proDTO the entity to save.
     * @return the persisted entity.
     */
    public ProDTO update(ProDTO proDTO) {
        log.debug("Request to update Pro : {}", proDTO);
        Pro pro = proMapper.toEntity(proDTO);
        pro = proRepository.save(pro);
        return proMapper.toDto(pro);
    }

    /**
     * Partially update a pro.
     *
     * @param proDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ProDTO> partialUpdate(ProDTO proDTO) {
        log.debug("Request to partially update Pro : {}", proDTO);

        return proRepository
            .findById(proDTO.getId())
            .map(existingPro -> {
                proMapper.partialUpdate(existingPro, proDTO);

                return existingPro;
            })
            .map(proRepository::save)
            .map(proMapper::toDto);
    }

    /**
     * Get all the pros.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProDTO> findAll() {
        log.debug("Request to get all Pros");
        return proRepository.findAll().stream().map(proMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one pro by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProDTO> findOne(Long id) {
        log.debug("Request to get Pro : {}", id);
        return proRepository.findById(id).map(proMapper::toDto);
    }

    /**
     * Delete the pro by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Pro : {}", id);
        proRepository.deleteById(id);
    }
}
