package info4.gl.blog.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link info4.gl.blog.domain.Food} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FoodDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3)
    private String mealName;

    @NotNull
    @DecimalMin(value = "0")
    private BigDecimal price;

    private String decription;

    @Lob
    private byte[] image;

    private String imageContentType;
    private CompanyDTO name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDecription() {
        return decription;
    }

    public void setDecription(String decription) {
        this.decription = decription;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public CompanyDTO getName() {
        return name;
    }

    public void setName(CompanyDTO name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FoodDTO)) {
            return false;
        }

        FoodDTO foodDTO = (FoodDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, foodDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FoodDTO{" +
            "id=" + getId() +
            ", mealName='" + getMealName() + "'" +
            ", price=" + getPrice() +
            ", decription='" + getDecription() + "'" +
            ", image='" + getImage() + "'" +
            ", name=" + getName() +
            "}";
    }
}
