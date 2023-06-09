package info4.gl.blog.domain;

import static org.assertj.core.api.Assertions.assertThat;

import info4.gl.blog.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FoodTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Food.class);
        Food food1 = new Food();
        food1.setId(1L);
        Food food2 = new Food();
        food2.setId(food1.getId());
        assertThat(food1).isEqualTo(food2);
        food2.setId(2L);
        assertThat(food1).isNotEqualTo(food2);
        food1.setId(null);
        assertThat(food1).isNotEqualTo(food2);
    }
}
