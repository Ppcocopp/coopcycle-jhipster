package info4.gl.blog.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProMapperTest {

    private ProMapper proMapper;

    @BeforeEach
    public void setUp() {
        proMapper = new ProMapperImpl();
    }
}
