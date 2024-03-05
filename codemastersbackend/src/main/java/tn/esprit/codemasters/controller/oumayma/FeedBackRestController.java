package tn.esprit.codemasters.controller.oumayma;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.codemasters.entity.FeedBack;
import tn.esprit.codemasters.entity.Session;
import tn.esprit.codemasters.service.oumayma.FeedbackService;

@RestController
@RequestMapping("feedback")
@AllArgsConstructor
public class FeedBackRestController {
    private final FeedbackService feedbackService;

    @PostMapping("/add/{sessionId}")
    public FeedBack addFeedback(@RequestBody FeedBack feedback, @PathVariable(name = "sessionId") Long sessionId) {
        return feedbackService.addFeedback(feedback,sessionId);}

}
