package info4.gl.blog.service.mapper;

import info4.gl.blog.domain.Company;
import info4.gl.blog.domain.Food;
import info4.gl.blog.service.dto.CompanyDTO;
import info4.gl.blog.service.dto.FoodDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Food} and its DTO {@link FoodDTO}.
 */
@Mapper(componentModel = "spring")
public interface FoodMapper extends EntityMapper<FoodDTO, Food> {
    @Mapping(target = "name", source = "name", qualifiedByName = "companyId")
    FoodDTO toDto(Food s);

    @Named("companyId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CompanyDTO toDtoCompanyId(Company company);
}
