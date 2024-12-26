

라우터 구조
    1. localhost:3000 '/' => 메인페이지, 네브바, 추천배너, 
        - localhost:3000 '/' => 메인페이지, 네브바, 추천배너, 
    
    2. localhost:3000 '/auth' => 회원가입, 로그인, 로그아웃 
        - localhost:3000/auth '/join' =>
        - localhost:3000/auth '/login' =>
        - localhost:3000/auth '/logout' =>

    3. localhost:3000 '/products'
        - localhost:3000/products '/list' => 제품리스트
        - localhost:3000/products '/:product_id' => 제품 상세페이지

    4. localhost:3000 '/board'
        - localhost:3000/board '/community' => 커뮤니티 게시판
        - localhost:3000/board '/community/:postid' => 게시글
        - localhost:3000/board '/review' => 리뷰 게시판
        - localhost:3000/board '/review/:postid' => 게시글
        - localhost:3000/board '/Q&A' => 문의게시판

    5. localhost:3000 '/orders'
        - localhost:3000/orders '/cart' => 장바구니
        - localhost:3000/orders '/like' => 찜
        - localhost:3000/orders '/order' => 주문
       
        
