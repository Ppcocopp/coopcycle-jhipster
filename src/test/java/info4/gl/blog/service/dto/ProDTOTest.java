package info4.gl.blog.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import info4.gl.blog.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProDTO.class);
        ProDTO proDTO1 = new ProDTO();
        proDTO1.setId(1L);
        ProDTO proDTO2 = new ProDTO();
        assertThat(proDTO1).isNotEqualTo(proDTO2);
        proDTO2.setId(proDTO1.getId());
        assertThat(proDTO1).isEqualTo(proDTO2);
        proDTO2.setId(2L);
        assertThat(proDTO1).isNotEqualTo(proDTO2);
        proDTO1.setId(null);
        assertThat(proDTO1).isNotEqualTo(proDTO2);
    }
}
