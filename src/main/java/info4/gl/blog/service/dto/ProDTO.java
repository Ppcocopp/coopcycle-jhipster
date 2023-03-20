package info4.gl.blog.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link info4.gl.blog.domain.Pro} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProDTO implements Serializable {

    private Long id;

    private String description;

    private UserDTO mail;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserDTO getMail() {
        return mail;
    }

    public void setMail(UserDTO mail) {
        this.mail = mail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProDTO)) {
            return false;
        }

        ProDTO proDTO = (ProDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, proDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", mail=" + getMail() +
            "}";
    }
}
