package com.example.backend.service.ChildParent;

import com.example.backend.domain.Child;
import com.example.backend.domain.Parent;
import com.example.backend.domain.PersonalityRepository;
import com.example.backend.dto.ChildParentRequest.ChildPersonalityRequest;
import com.example.backend.dto.ChildParentRequest.ChildRequest;
import com.example.backend.dto.ChildParentRequest.ParentRequest;
import com.example.backend.repository.ChildParent.ChildRepository;
import com.example.backend.repository.ChildParent.ParentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NonRelation {

    // Repository 로드
    // 'SQL 써주는 JPA 상속받은 레포지토리'에 보내줄 수 있도록
    private final ChildRepository childRepository;
    private final ParentRepository parentRepository;


    // 생성자.
    public NonRelation(ChildRepository childRepository, ParentRepository parentRepository) {
        this.childRepository = childRepository;
        this.parentRepository = parentRepository;

    }


    @Transactional
    public void testChildRelational(ParentRequest parentRequest, ChildRequest childRequest){
        // 우리가 만든 도메인, 포스트메핑 컨트롤러의 요청이 들어왔을 때 레포지토리로 던져주는 서비스 제작할거임

        // 페런트 정보 받아서 db로 보내 저장
        Parent parent = new Parent(parentRequest.getEmail(), parentRequest.getName());
        parentRepository.save(parent);
        // 인수가 비어있으면 기본생성자가 호출된다. 그럼 PROTECTED라 접근 불가임.
        // 활용할 생성자 시그니쳐에 맞춰서 넣어줘야한다.

        // 차일드 정보 받아서 db로 보내 저장
        Child child = new Child(childRequest.getLoginID(), childRequest.getPassword(), childRequest.getName());
        child.setParent(parent);
        childRepository.save(child);

        // 방금 db에 저장한 페런츠의 아이 리스트 가져오기
        // 패런트 id에 해당하는 패런트 정보를 받아와서, 새로운 페런츠 인스턴스에 저장. (실제로 DB에 저장된 값을 꺼내온다)
        Parent savedParent = parentRepository.findById(parent.getId()).orElseThrow();
        System.out.println("Parent 정보" + savedParent.getChildList());
    }

    @Transactional
    public void relationMethod(ParentRequest parentRequest, ChildRequest childRequest){
        // 우리가 만든 도메인, 포스트메핑 컨트롤러의 요청이 들어왔을 때 레포지토리로 던져주는 서비스 제작할거임

        // 페런트 정보 받아서 db로 보내 저장
        Parent parent = new Parent(parentRequest.getEmail(), parentRequest.getName());
        parentRepository.save(parent);
        // 인수가 비어있으면 기본생성자가 호출된다. 그럼 PROTECTED라 접근 불가임.
        // 활용할 생성자 시그니쳐에 맞춰서 넣어줘야한다.

        // 차일드 정보 받아서 db로 보내 저장
        Child child = new Child(childRequest.getLoginID(), childRequest.getPassword(), childRequest.getName());
        parent.addChild(child);
        childRepository.save(child);

        // 방금 db에 저장한 페런츠의 아이 리스트 가져오기
        // 패런트 id에 해당하는 패런트 정보를 받아와서, 새로운 페런츠 인스턴스에 저장. (실제로 DB에 저장된 값을 꺼내온다)
        Parent savedParent = parentRepository.findById(parent.getId()).orElseThrow();
        System.out.println("Parent 정보" + savedParent.getChildList());
    }



}
