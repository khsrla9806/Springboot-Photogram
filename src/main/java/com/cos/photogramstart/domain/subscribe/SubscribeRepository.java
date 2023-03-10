package com.cos.photogramstart.domain.subscribe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Integer> {

    @Modifying // INSERT, UPDATE, DELETE 쿼리에는 무조건 넣어줘야 한다. DB에 변경을 주기 때문에
    @Query(value = "INSERT INTO subscribe(fromUserId, toUserId, createDate) VALUES(:fromUserId, :toUserId, now())", nativeQuery = true)
    void customSubscribe(int fromUserId, int toUserId);

    @Modifying
    @Query(value = "DELETE FROM subscribe WHERE fromUserId=:fromUserId AND toUserId=:toUserId", nativeQuery = true)
    void customUnSubscribe(int fromUserId, int toUserId);

    @Query(value = "SELECT COUNT(*) FROM subscribe WHERE fromUserId=:principalId AND toUserId=:pageUserId", nativeQuery = true)
    int customSubscribeState(int principalId, int pageUserId); // 1이 나오면 구독중, 0이 나오면 구독중이지 않음

    @Query(value = "SELECT COUNT(*) FROM subscribe WHERE fromUserId=:pageUserId", nativeQuery = true)
    int customSubscribeCount(int pageUserId);
}
