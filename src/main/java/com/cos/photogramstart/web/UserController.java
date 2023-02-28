package com.cos.photogramstart.web;

import com.cos.photogramstart.config.auth.PrincipalUserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class UserController {

    // 사용자 프로필로 이동
    @GetMapping("/user/{id}")
    public String profile(@PathVariable int id) {
        return "user/profile";
    }

    // 사용자 정보 수정페이지로 이동
    @GetMapping("/user/{id}/update")
    public String update(@PathVariable int id, @AuthenticationPrincipal PrincipalUserDetails principal) {
        System.out.println("세션 정보 : " + principal.getUser().getUsername());
        return "user/update";
    }
}
