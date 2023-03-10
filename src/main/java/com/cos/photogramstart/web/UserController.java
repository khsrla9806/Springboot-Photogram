package com.cos.photogramstart.web;

import com.cos.photogramstart.config.auth.PrincipalUserDetails;
import com.cos.photogramstart.domain.user.User;
import com.cos.photogramstart.service.UserService;
import com.cos.photogramstart.web.dto.user.UserProfileDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
public class UserController {

    private final UserService userService;

    // 사용자 프로필로 이동
    @GetMapping("/user/{pageUserId}")
    public String profile(@PathVariable int pageUserId, Model model, @AuthenticationPrincipal PrincipalUserDetails principal) {
        UserProfileDto dto = userService.UserProfile(pageUserId, principal.getUser().getId());
        model.addAttribute("dto", dto);
        return "user/profile";
    }

    // 사용자 정보 수정페이지로 이동
    // JSP를 사용할 때는 Model을 사용하지 않고, Security 태그라이브러리를 사용
    @GetMapping("/user/{id}/update")
    public String update(@PathVariable int id, @AuthenticationPrincipal PrincipalUserDetails principal) {
        return "user/update";
    }
}
