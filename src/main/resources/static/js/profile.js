/**
  1. 유저 프로파일 페이지
  (1) 유저 프로파일 페이지 구독하기, 구독취소
  (2) 구독자 정보 모달 보기
  (3) 구독자 정보 모달에서 구독하기, 구독취소
  (4) 유저 프로필 사진 변경
  (5) 사용자 정보 메뉴 열기 닫기
  (6) 사용자 정보(회원정보, 로그아웃, 닫기) 모달
  (7) 사용자 프로파일 이미지 메뉴(사진업로드, 취소) 모달 
  (8) 구독자 정보 모달 닫기
 */

// (1) 유저 프로파일 페이지 구독하기, 구독취소
function toggleSubscribe(toUserId, obj) {
	if ($(obj).text() === "구독취소") {
	    $.ajax({
            type: "delete",
            url: `/api/subscribe/${toUserId}`,
            dataType: "json"
	    }).done(response => {
	        $(obj).text("구독하기");
            $(obj).toggleClass("blue");
	    }).fail(error => {
            console.log("구독취소 실패");
	    });
	} else {
	    $.ajax({
            type: "post",
            url: `/api/subscribe/${toUserId}`,
            dataType: "json"
        }).done(response => {
            $(obj).text("구독취소");
            $(obj).toggleClass("blue");
        }).fail(error => {
            console.log("구독하기 실패");
        });
	}
}

// (2) 구독자 정보  모달 보기
function subscribeInfoModalOpen(pageUserId) {
	$(".modal-subscribe").css("display", "flex");

	$.ajax({
	    type: "get",
	    url: `/api/user/${pageUserId}/subscribe`,
	    dataType: "json"
	}).done(response => {
        response.data.forEach((u) => {
            let item = getSubscribeModalItem(u);
            $("#subscribeModalList").append(item); // 구독정보를 감싸고있는 div 태그
        });
	}).fail(error => {
        console.log("실패!", error);
	});
}

// 구독정보 데이터를 받아줄 메서드
function getSubscribeModalItem(u) {
    let item = `
    <div class="subscribe__item" id="subscribeModalItem-${u.id}}">
        <div class="subscribe__img">
            <img src="/upload/${u.profileImageUrl}" onerror="this.src='/images/person.jpeg'"/>
        </div>
        <div class="subscribe__text">
            <h2>${u.username}</h2>
        </div>
        <div class="subscribe__btn">`;

        if (!u.equalUserState) {
            if (u.subscribeState) {
                item += `<button class="cta blue" onclick="toggleSubscribe(${u.id}, this)">구독취소</button>`;
            } else {
                item += `<button class="cta" onclick="toggleSubscribe(${u.id}, this)">구독하기</button>`;
            }
        }

        // 백틱으로 구분해서 if 사용
        item += `
        </div>
    </div>`;

    return item;
}


// (3) 구독자 정보 모달에서 구독하기, 구독취소
function toggleSubscribeModal(obj) {
	if ($(obj).text() === "구독취소") {
		$(obj).text("구독하기");
		$(obj).toggleClass("blue");
	} else {
		$(obj).text("구독취소");
		$(obj).toggleClass("blue");
	}
}

// (4) 유저 프로파일 사진 변경 (완)
function profileImageUpload(pageUserId, principalId) {
	if (pageUserId != principalId) {
		alert("수정 권한이 없습니다.");
		return;
	}

	$("#userProfileImageInput").click();

	$("#userProfileImageInput").on("change", (e) => {
		let f = e.target.files[0];

		if (!f.type.match("image.*")) {
			alert("이미지 파일을 등록해주세요.");
			return;
		}

		// 서버에 이미지 전송
		let profileImageForm = $("#userProfileImageForm")[0];

		// Ajax로 form 데이터를 보낼 때는 FormData 오브젝트를 사용해야 한다.
		let formData = new FormData(profileImageForm);

		// Ajax 요청
		$.ajax({
			type: "put",
			url: `/api/user/${principalId}/profileImageUrl`,
			data: formData,
			contentType: false, // Default가 true이고, 이는 x-www-from-urlencoded로 파싱됨. false로 해서 multipart/from-data로 받아야함
			processData: false, // multipart/form-data로 보낼 때, 같이 false로 변경
			enctype: "multipart/form-data",
			dataType: "json"
		}).done(response => {
			let reader = new FileReader();

			// 사진 전송이 성공되면 유저 이미지의 src를 변경
			reader.onload = (e) => {
				$("#userProfileImage").attr("src", e.target.result)
			}
			reader.readAsDataURL(f); // 자동으로 reader.onload()가 실행되는 코드
			alert("프로필 이미지 변경이 완료되었습니다.");

		}).fail(error => {
			console.log("오류", error);
		});

	})
}


// (5) 사용자 정보 메뉴 열기 닫기
function popup(obj) {
	$(obj).css("display", "flex");
}

function closePopup(obj) {
	$(obj).css("display", "none");
}


// (6) 사용자 정보(회원정보, 로그아웃, 닫기) 모달
function modalInfo() {
	$(".modal-info").css("display", "none");
}

// (7) 사용자 프로파일 이미지 메뉴(사진업로드, 취소) 모달
function modalImage() {
	$(".modal-image").css("display", "none");
}

// (8) 구독자 정보 모달 닫기
function modalClose() {
	$(".modal-subscribe").css("display", "none");
	location.reload();
}






