# api

## 基本信息查询

### 个人信息

`https://api.github.com/users/用户名`

### 个人所有repo

`https://api.github.com/users/用户名/repos`

### repo详细信息

`https://api.github.com/repos/用户名/仓库名`

### 获取某个repo的内容列表

`https://api.github.com/repos/solomonxie/gists/contents`

注意这只会返回根目录的内容。

### 获取repo中子目录的内容列表

`https://api.github.com/repos/solomonxie/gists/contents/目录名`

一定要注意这里一定要完全遵循原文件名的大小写，否则无法获得信息。如果是更深层的内容，则在链接列按照顺序逐级写上目录名称。

### 获取repo中某文件信息（不包括内容）

`https://api.github.com/repos/solomonxie/gists/contents/文件路径`
文件路径是文件的完整路径，区分大小写。只会返回文件基本信息。

### repo中所有的commits列表

`https://api.github.com/repos/用户名/仓库名/commits`

### 某一条commit详情

`https://api.github.com/repos/用户名/仓库名/commits/某一条commit的SHA`

### issues列表

`https://api.github.com/repos/用户名/仓库名/issues`

### 某条issue详情

`https://api.github.com/repos/用户名/仓库名/issues/序号`
issues都是以1,2,3这样的序列排号的

### 某issue中的comments列表

`https://api.github.com/repos/用户名/仓库名/issues/序号/comments`

### 某comment详情

`https://api.github.com/repos/用户名/仓库名/issues/comments/评论详情的ID`
其中评论ID是从issues列表中获得的

## 查询参数

### 分页功能

格式是`?page=页数&per_page=每页包含数量`。

如`https://api.github.com/users/solomonxie/repos?page=2&per_page=3`

### issues状态

格式是`?state=状态`。

如`https://api.github.com/repos/solomonxie/solomonxie.github.io/issues?state=closed`


[一篇文章搞定Github API 调用 (v3）](https://segmentfault.com/a/1190000015144126)