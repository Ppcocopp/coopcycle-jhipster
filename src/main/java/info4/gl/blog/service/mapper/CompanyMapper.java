package info4.gl.blog.service.mapper;

import info4.gl.blog.domain.Company;
import info4.gl.blog.domain.Pro;
import info4.gl.blog.service.dto.CompanyDTO;
import info4.gl.blog.service.dto.ProDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Company} and its DTO {@link CompanyDTO}.
 */
@Mapper(componentModel = "spring")
public interface CompanyMapper extends EntityMapper<CompanyDTO, Company> {
    @Mapping(target = "mail", source = "mail", qualifiedByName = "proId")
    CompanyDTO toDto(Company s);

    @Named("proId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProDTO toDtoProId(Pro pro);
}
