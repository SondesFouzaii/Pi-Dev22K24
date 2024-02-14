package tn.esprit.codemasters.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Sprint;
import tn.esprit.codemasters.repository.SprintRepository;

import java.util.List;
@Service
@AllArgsConstructor
public class SprintServiceImpl implements ISprintService{
    SprintRepository sprintRepository;
    @Override
    public List<Sprint> retrieveAllSprints() {
        return sprintRepository.findAll();
    }

    @Override
    public Sprint retrieveSprint(Long SprintId) {
        return sprintRepository.findById(SprintId).orElse(null);
    }

    @Override
    public Sprint addSprint(Sprint s) {
        return sprintRepository.save(s);
    }

    @Override
    public void removeSprint(Long SprintId) {
        sprintRepository.deleteById(SprintId);

    }

    @Override
    public Sprint modifySprint(Sprint sprint) {
        return sprintRepository.save(sprint);
    }
}
