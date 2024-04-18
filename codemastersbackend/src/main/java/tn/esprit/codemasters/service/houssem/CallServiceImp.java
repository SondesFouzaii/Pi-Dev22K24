package tn.esprit.codemasters.service.houssem;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.user.CallUser;
import tn.esprit.codemasters.entity.user.User;
import tn.esprit.codemasters.repository.CallRepository;
import tn.esprit.codemasters.repository.UserRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class CallServiceImp implements ICallService {
    CallRepository callRepository;
    UserRepository userRepository;


    @Override
    public void makeACall(CallUser call) {
        call.setAnsered(false);
        call.setDate(new Date());
        callRepository.save(call);
    }

    @Override
    public List<CallUser> getMyCallHistory(Long idUser) {
        List<CallUser> allthecalls = callRepository.findAll();
        List<CallUser> myCall = new ArrayList<>();
        for (CallUser c : allthecalls) {
            c.setNomappelant(userRepository.findById(c.getIdappelant()).orElse(null).getFirst_name());
            c.setNomappeler(userRepository.findById(c.getIdappeler()).orElse(null).getFirst_name());
            if (c.getIdappelant() == idUser || c.getIdappeler() == idUser) {
                if (c.getIdappelant() == idUser) {
                    c.setMessage("you called " + userRepository.findById(c.getIdappeler()).orElse(null).getFirst_name() + " " + userRepository.findById(c.getIdappeler()).orElse(null).getLast_name());
                    myCall.add(c);
                }
                if (c.getIdappeler() == idUser) {
                    c.setMessage(userRepository.findById(c.getIdappelant()).orElse(null).getFirst_name() + " " + userRepository.findById(c.getIdappelant()).orElse(null).getLast_name() + " called you");
                    myCall.add(c);
                }
            }
        }
        return myCall;
    }

    @Override
    public boolean isSomeoneCallingMe(Long id) {
        boolean anwser = false;
        Date currentTime = new Date();
        long thresholdMillis = 25 * 1000;
        Date timeLimit = new Date(currentTime.getTime() - thresholdMillis);

        List<CallUser> calls = callRepository.findAll();
        for (CallUser call : calls)
            if (timeLimit.getTime() < call.getDate().getTime() && call.getIdappeler() == id) {
                anwser = true;
                break;
            }
        return anwser;
    }

    @Override
    public User whoIsCallingMe(Long id) {
        Date currentTime = new Date();
        long thresholdMillis = 25 * 1000;
        Date timeLimit = new Date(currentTime.getTime() - thresholdMillis);

        List<CallUser> calls = callRepository.findAll();
        User user = null;
        for (CallUser call : calls)
            if (timeLimit.getTime() < call.getDate().getTime() && call.getIdappeler() == id) {
                user = userRepository.findById(call.getIdappelant()).orElse(null);
                break;
            }
        return user;
    }

    @Override
    public void pickUpThePhone() {
        Date currentTime = new Date();
        long thresholdMillis = 25 * 1000;
        Date timeLimit = new Date(currentTime.getTime() - thresholdMillis);

        List<CallUser> calls = callRepository.findAll();
        for (CallUser call : calls)
            if (timeLimit.getTime() < call.getDate().getTime()) {
                call.setAnsered(true);
                callRepository.save(call);
                break;
            }
    }
}
