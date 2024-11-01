
# init : git이 관리할 수 있도록. 실행후에는 폴더에 [.git] 이라는 숨겨진폴더가 생긴다. 
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder
$ git init
Initialized empty Git repository in C:/Users/Administrator/newtryfolder/.git/

## 만든 폴더를 remote에 연결만 하면 되는게 아니라 최초 push를 해주어야 한다. (add - commit - push) 
# STEP.1
# add : 내 순수한 컴퓨터 메모리, [workspace]에서 작업한 파일을 git이 추적할 수 있도록 [index (or stage)]에 올린다. 
# 한번 [index]에 올라온 파일은 지속적으로 git이 추적한다.
# . : 모든 사항
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git add .

# STEP.2
# commit : [index]에 올라온 git관리 대상 파일을 git의 repository인 [local repository] 에 올린다.
# "이번 커밋은 이렇게 불러야지"
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git commit -m "reset repository commit"
On branch master

Initial commit

nothing to commit (create/copy files and use "git add" to track)


# git remote -v : 현재 Github에 설정된 [remote repository]의 정보를 보여주는 명령어
# -v : "verbose"의 약자
# 결과로는원격 저장소의 이름(예: origin)과 해당 URL이 출력
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git remote -v
#아직 연결된 remote가 없어서 아무 출력이 없음.


# remote add (remote repository : 이름) (remote repository : url) 
# url(깃헙 레포지토리의) 를, 해당 이름으로 설정하고 remote로 add 하기
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git remote add myorigin https://github.com/AnnNulee/newtry.git


Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git remote -v
myorigin        https://github.com/AnnNulee/newtry.git (fetch)
myorigin        https://github.com/AnnNulee/newtry.git (push)
# 설정된 remote들이 표시됨


# remote가 설정이 되었으면, 최초로 remote 를 끌어와야한다 (pull)
# 현재 작업하는 branch가 git에서 사용하는 디폴트인 'master여도, 처음 끌어올때는 (github에서 사용하는 이름인)main으로 끌어와야 연결이 된다.
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git pull myorigin main
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (3/3), 856 bytes | 122.00 KiB/s, done.
From https://github.com/AnnNulee/newtry
 * branch            main       -> FETCH_HEAD
 * [new branch]      main       -> myorigin/main
 
 
# myorigin의 branch인 'master'를 github repository에 올려준다. 
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git push myorigin master
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote:
remote: Create a pull request for 'master' on GitHub by visiting:
remote:      https://github.com/AnnNulee/newtry/pull/new/master
remote:
To https://github.com/AnnNulee/newtry.git
 * [new branch]      master -> master



## 폴더와 github 연결 완료



# 폴더에 변경사항이 있을 때.abs

# add 하여 index에 올려줌
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git add .

# 상태 걍 한번 체크. 
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   try1/file1.txt    # 감지된 변경사항


# commit 하여 local repository에 올려줌
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git commit -m "new folder, try1"
[master 6612add] new folder, try1
 1 file changed, 1 insertion(+)
 create mode 100644 try1/file1.txt

# push 하여 myorigin(github의 remote repository) 의 master 브랜치에 올려줌
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git push myorigin master
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (4/4), 326 bytes | 326.00 KiB/s, done.
Total 4 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/AnnNulee/newtry.git
   73c2e2e..6612add  master -> master


# branch : 현재 존재하는 branch 표기.
# * : 현재 branch 위치
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git branch
* master


# 새로운 브런치 생성
# git branch (파생된 새로운 브런치 이름) (복사 대상인 원래 브런치)
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git branch master_branch1 master


Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git branch
* master
  master_branch1 # 새로운 branch 확인
  

# checkout : 해당 브런치에서 작업하겠다.
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git checkout master_branch1
Switched to branch 'master_branch1' # switch 써도 옮겨짐


Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master_branch1) ### 해당 브런치에서 작업 중
$ git status
On branch master_branch1
nothing to commit, working tree clean


# 새로 만든 브런치를 myorigin(github repo.) 에 등록 (push)
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master_branch1)
$ git push myorigin master_branch1
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote:
remote: Create a pull request for 'master_branch1' on GitHub by visiting:
remote:      https://github.com/AnnNulee/newtry/pull/new/master_branch1
remote:
To https://github.com/AnnNulee/newtry.git
 * [new branch]      master_branch1 -> master_branch1
 
 
 
# master 브런치로 옮김
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master_branch1)
$ git checkout master
Switched to branch 'master'


# master 브런치에서, master_branch1의 수정사항을 불러들여 병합. 
# 단 master에서도 수정을 하더라도 그건 그대로 있다. 머지할 대상 브런치(master_branch1)의 수정사항만 불러들여짐. 
# 다만 같은 코드를 건드린 경우 어떤것을 쓸지 고르게 되어있다.
Administrator@User -2024SLNWT MINGW32 ~/newtryfolder (master)
$ git merge master_branch1
Already up to date.

       
