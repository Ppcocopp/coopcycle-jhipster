package info4.gl.blog.service;

import info4.gl.blog.domain.Food;
import info4.gl.blog.repository.FoodRepository;
import info4.gl.blog.service.dto.FoodDTO;
import info4.gl.blog.service.mapper.FoodMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Food}.
 */
@Service
@Transactional
public class FoodService {

    private final Logger log = LoggerFactory.getLogger(FoodService.class);

    private final FoodRepository foodRepository;

    private final FoodMapper foodMapper;

    public FoodService(FoodRepository foodRepository, FoodMapper foodMapper) {
        this.foodRepository = foodRepository;
        this.foodMapper = foodMapper;
    }

    /**
     * Save a food.
     *
     * @param foodDTO the entity to save.
     * @return the persisted entity.
     */
    public FoodDTO save(FoodDTO foodDTO) {
        log.debug("Request to save Food : {}", foodDTO);
        Food food = foodMapper.toEntity(foodDTO);
        food = foodRepository.save(food);
        return foodMapper.toDto(food);
    }

    /**
     * Update a food.
     *
     * @param foodDTO the entity to save.
     * @return the persisted entity.
     */
    public FoodDTO update(FoodDTO foodDTO) {
        log.debug("Request to update Food : {}", foodDTO);
        Food food = foodMapper.toEntity(foodDTO);
        food = foodRepository.save(food);
        return foodMapper.toDto(food);
    }

    /**
     * Partially update a food.
     *
     * @param foodDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<FoodDTO> partialUpdate(FoodDTO foodDTO) {
        log.debug("Request to partially update Food : {}", foodDTO);

        return foodRepository
            .findById(foodDTO.getId())
            .map(existingFood -> {
                foodMapper.partialUpdate(existingFood, foodDTO);

                return existingFood;
            })
            .map(foodRepository::save)
            .map(foodMapper::toDto);
    }

    /**
     * Get all the foods.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<FoodDTO> findAll() {
        log.debug("Request to get all Foods");
        return foodRepository.findAll().stream().map(foodMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one food by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<FoodDTO> findOne(Long id) {
        log.debug("Request to get Food : {}", id);
        return foodRepository.findById(id).map(foodMapper::toDto);
    }

    /**
     * Delete the food by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Food : {}", id);
        foodRepository.deleteById(id);
    }
}
