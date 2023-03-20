package info4.gl.blog.service.mapper;

import info4.gl.blog.domain.Pro;
import info4.gl.blog.domain.User;
import info4.gl.blog.service.dto.ProDTO;
import info4.gl.blog.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Pro} and its DTO {@link ProDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProMapper extends EntityMapper<ProDTO, Pro> {
    @Mapping(target = "mail", source = "mail", qualifiedByName = "userId")
    ProDTO toDto(Pro s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
