package tn.esprit.codemasters.service.houssem;

import tn.esprit.codemasters.entity.user.CallUser;
import tn.esprit.codemasters.entity.user.User;

import java.util.List;

//video call service
public interface ICallService {

    public void makeACall(CallUser call);
    public List<CallUser> getMyCallHistory(Long idUser);

    public boolean isSomeoneCallingMe(Long id);

    public User whoIsCallingMe(Long id);

    public void pickUpThePhone();
}
