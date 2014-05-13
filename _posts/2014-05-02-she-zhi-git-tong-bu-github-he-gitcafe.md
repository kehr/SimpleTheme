---
layout: post
title: "设置git同步github和gitcafe"
modified: 2014-05-02 13:16:23 +0800
tags: [git]
categories: git
image:
  feature: abstract-11.jpg
  credit: 
  creditlink: 
comments: true
share: true
---

<figure>
    <center>	
        <a href="#"><img src="/images/blog/git.png" alt="git push"></a>
        	<figcaption>push结果</figcaption>
    </center>
</figure>
 

##背景 
最近做的一个项目需要在github和gitcafe上保持同步。前段时间比较懒，手动做的，很麻烦。今天整理了一下，查了点资料，只需要在本地目录的配置文件里做一些额外的配置就好了。  

对git的认识又加深了一步。

##步骤  

我编辑的是原push到github的工作目录的文件

### 编辑项目目录下的`.git/config`文件   

在`[remote "origin"]`下新增一个指向gitcafe项目地址的url，如下：   

{% highlight bash %}
url = git@gitcafe.com:kehr/upcloud-for-UPYUN.git
{% endhighlight %}

这一步完成后你就可以直接通过`git push`命令同时将更新push到github和gitcafe。  

如果提示失败像下面这样：  

{% highlight bash linenos %}
➜  upcloud git:(master) ✗ > git push gitcafe master 
To git@gitcafe.com:kehr/upcloud-for-UPYUN.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git@gitcafe.com:kehr/upcloud-for-UPYUN.git'
To prevent you from losing history, non-fast-forward updates were rejected
Merge the remote changes (e.g. 'git pull') before pushing again.  See the
'Note about fast-forwards' section of 'git push --help' for details.
{% endhighlight %}

说明你的项目的history丢失，在你确定本地项目没有问题的情况下，执行`git push -f`就可以了。  

####如果你像我一样，希望能够push到指定的项目仓库，同时也能一次push到两个仓库，你可以接着往下看。

仍旧编辑`.git/config`文件，增加两个`remote`配置。如下：  

{% highlight bash %}
[remote "gitcafe"]
	fetch = +refs/heads/*:refs/remotes/origin/*
	url = git@gitcafe.com:kehr/upcloud-for-UPYUN.git
[remote "github"]
	fetch = +refs/heads/*:refs/remotes/origin/*
    url = https://github.com/kehr/upcloud.git
{% endhighlight %}
保存退出。  

将项目push到gitcafe：  
{% highlight bash %}
git push gitcafe
{% endhighlight %}   

将项目push到github：   
{% highlight bash %}
git push github
{% endhighlight %}

将项目push到github和gitcafe：
{% highlight bash %}
git push
{% endhighlight %}   
OK,这样就搞定了

最后贴上我的`.git/config`文件：   
{% highlight bash %}
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
[remote "origin"]
	fetch = +refs/heads/*:refs/remotes/origin/*
    url = git@gitcafe.com:kehr/upcloud-for-UPYUN.git
	url = https://github.com/kehr/upcloud.git
[remote "gitcafe"]
	fetch = +refs/heads/*:refs/remotes/origin/*
	url = git@gitcafe.com:kehr/upcloud-for-UPYUN.git
[remote "github"]
	fetch = +refs/heads/*:refs/remotes/origin/*
    url = https://github.com/kehr/upcloud.git
[branch "master"]
	remote = origin
	merge = refs/heads/master
{% endhighlight %}

其它的远程仓库配置如gitshell，于此类似。Have fun ！

