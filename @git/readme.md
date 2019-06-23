*git 是个好东西，能够为我们开发带来很多便利，无论是个人开发还是团队开发，都是
很便利的，由于没有接触过其他版本控制工具，不与其他比较*

#### git config

`git config [--local|--global|--system] -l`(默认--local)

Git 自带一个git config 的工具来帮助设置控制 Git 外观和行为的配置变量

`git config --global user.name "biubiupiu"`
配置全局用户名

`git config --global user.name "1757191096@qq.com"`
配置全局用户邮箱

这些配置都是会在每次git提交上的。

`commit 078afd00a55bdaf62c4e902b3507c98c2baf63ee (HEAD -> master)`  
`Author: biubiupiu <1757191096@qq.com>`  
`Date:   Sat May 18 18:55:42 2019 +0800`  

>如果需要在某个项目配置别的用户名，则去掉`--global`即可在当前项目配置其他的用户信息

#### 记录一些常用命令：

`git checkout -b develop`

创建分支并选择

`git branch develop`

创建分支

`git fetch --all`

拉取所有远端的最新代码 

`git merge origin/develop `

上面两个命令等同于`git pull`

`git merge --no-ff origin/develop`

合并分支，不执行fast-forward  

`git branch `

查看本地所有分支

`git branch -r`

查看所有远程的分支

`git branch -a`

查看所有远程分支和本地分支

`git branch -d <branchname>`

 删除本地branchname分支
 
`git branch -m brancholdname branchnewname`

重命名分支

`git checkout -- xx/xx`

回滚单个文件

`git pull origin master:master`

将远程origin主机的master分支合并到当前master分支,冒号后面的部分表示当前本地所在的分支

`git push origin -d <branchname> `

 删除远程branchname分支
 
 `git fetch --p`
 
 更新远程分支至本地，并删除远程仓库已经删除的
 
 `git remote prune origin`

 更新远程分支至本地，并删除远程仓库已经删除的
 
 `git commit -a -m  `
 
 等同于先`add` 再 `commit`提交所有的修改

`git commit ./xx `

等同于git add ./xx + git commit

`git commit --amend`

修改提交

**git reset**

`git reset`的三种方式(`--hard --soft --mixed`)

假设当前commit和工作目录如下所示：

![Image text](https://user-gold-cdn.xitu.io/2017/12/10/1603f4a817765b40?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![image](https://user-gold-cdn.xitu.io/2017/12/10/1603f4a81d12fde0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

`git reset --hard HEAD^`

本地改动全部消失，未跟踪文件除外  
重置index以便反映HEAD的变化，并且重置working copy也使得其完全匹配起来。

![image](https://user-gold-cdn.xitu.io/2017/12/10/1603f4a85877b2ab?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

`git reset --soft HEAD^`

reset之前commit的改动被追加放进暂存区，并保留了工作目录

![image](https://user-gold-cdn.xitu.io/2017/12/10/1603f4a857c98476?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

`git reset --mixed HEAD^`(reset 默认模式)

同--soft一样保留了工作目录，但暂存区被全部被清空，之前commit的改动被放到未追踪文件中

![image](https://user-gold-cdn.xitu.io/2017/12/10/1603f4a8902e6daf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

`git remote show origin`

查看remote地址，远程分支，还有本地分支与之相对应关系等信息。

`git remote add origin ssh://git@139.129.97.36:10022/fe-dev.git`

关联远程仓库

#### git中‘~’和‘^’的区别：


```

(<commit>|HEAD)^n
指的是HEAD的第n个父提交，可以通过在“^”后面跟上一个数字，表示第几个父提交，“^”相当“^1”。例如：HEAD^2 表示HEAD的第二次父提交

```

```

(<commit>|HEAD)~n
指的是HEAD的第n个祖先提交，可以通过在“~”后面跟上一个数字，表示第几个祖父提交，“~”相当“~1”，“~n”相当于连续的<n>个“^”。

```

```
例如：HEAD~2 表示HEAD的第一个父提交的第一个父提交。等式1：HEAD~ === HEAD^ === HEAD^1 等式2：HEAD~2 === HEAD^^ === HEAD^1^1
```
![image](https://upload-images.jianshu.io/upload_images/448235-baca93717bd67a88.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/665/format/webp)


#### git rebase

```
git rebase -i 
```

https://www.cnblogs.com/amou/p/9465880.html

https://www.cnblogs.com/ludashi/p/8213550.html

```

使用onto之后, 后面会跟3个参数
git rebase --onto base from to
命令的意义使用(from, to]所指定的范围内的所有commit在base这个commit之上进行重建.

```

https://segmentfault.com/q/1010000008299360/a-1020000008300586


```
git cherry-pick

```

https://blog.csdn.net/longintchar/article/details/83473594
