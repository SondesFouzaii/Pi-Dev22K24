package tn.esprit.codemasters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.codemasters.entity.quiz.TestComments;
import tn.esprit.codemasters.entity.user.CallUser;

public interface TestCommentsRepository extends JpaRepository<TestComments,Long> {
    TestComments findByQuestionIdAndId(String id,Long idd);
}
