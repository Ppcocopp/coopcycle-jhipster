package info4.gl.blog.domain;

import static org.assertj.core.api.Assertions.assertThat;

import info4.gl.blog.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pro.class);
        Pro pro1 = new Pro();
        pro1.setId(1L);
        Pro pro2 = new Pro();
        pro2.setId(pro1.getId());
        assertThat(pro1).isEqualTo(pro2);
        pro2.setId(2L);
        assertThat(pro1).isNotEqualTo(pro2);
        pro1.setId(null);
        assertThat(pro1).isNotEqualTo(pro2);
    }
}
