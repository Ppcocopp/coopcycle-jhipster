package info4.gl.blog.service.mapper;

import info4.gl.blog.domain.Customer;
import info4.gl.blog.domain.User;
import info4.gl.blog.service.dto.CustomerDTO;
import info4.gl.blog.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Customer} and its DTO {@link CustomerDTO}.
 */
@Mapper(componentModel = "spring")
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {
    @Mapping(target = "mail", source = "mail", qualifiedByName = "userId")
    CustomerDTO toDto(Customer s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
