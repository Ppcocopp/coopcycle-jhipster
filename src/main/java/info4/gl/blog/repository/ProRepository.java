package info4.gl.blog.repository;

import info4.gl.blog.domain.Pro;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Pro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProRepository extends JpaRepository<Pro, Long> {}
