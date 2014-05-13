---
layout: post
title: "Solved install vim-instant-markdown failed"
modified: 2014-03-13 11:29:26 +0800
tags: [vim,plugin]
categories: vim
image:
  feature: abstract-5.jpg
  credit: 
  creditlink: 
comments: true
share: true
---

#安装 vim-instant-markdown 问题解决
---

![官方示例][1]

一直在用 markdown 写文章，找一款比较好用的编辑器那也是必不可少的。

目前比较好用的编辑器:

<pre>
Windows:
    MarkdownPad
    MarkPad


Linux: 
    ReText

Mac: 
    Mou

在线编辑器:
    Markable.in
    Dillinger.io
    StackEdit (这个我一直在用，功能很强大，在线编辑的文本可以保存为 pdf 这一点我很喜欢, 强烈推荐使用)

浏览器插件:
    MaDe (Chrome)
</pre>

据说 Mou 不错，可是穷小子现在只能用 Linux 。至于 Mac 下的好东西，待我赚到 Mac Pro 再作研究。

我用过的编辑器有：ReText、UberWriter、Sublime text + Markdown Editing + markdown build、StackEdit、Dillinger.io

用过的面最好用的是: Sublime text + Markdown Editing + markdown build、StackEdit.

今天早上之前一直用 Sublime 写 markdown，每次写完后，编译在浏览器中预览，不是实时显示的。不过在 vim 上装上 vim-instant-markdown 插件之后一切问题都解决了。这篇博文就是在 vim 下写作的，感觉帅呆了！


##vim-instant-markdown
----------------------

这是一款神奇的插件，在linux下用 vim 写 markdown 的不二之选，今天早上才用上表示相见恨晚。[项目地址][2]

这家伙需要安装node.js 和 RubyGem，这两样东西都不错，可是我不会～。如果你看到这篇文章说明你还是了解它们的。详细的安装和配置参见官方说明。这里记录一下，我在安装过程中遇到的问题和对应的解决方案。

##Installation
--------------

###官方安装说明

You first need to have Ruby with RubyGems, and node.js with npm installed. (In the future there might be a version which won't require node.js at all, making installation easier)

- `[sudo] gem install pygments.rb`
- If you're using Ruby 1.9.2 or later, `[sudo] gem install redcarpet`. Otherwise, `[sudo] gem install redcarpet -v 2.3.0`
- `[sudo] npm -g install instant-markdown-d`
- If you're on Linux, the `xdg-utils` package needs to be installed (is installed by default on Ubuntu).
- Copy the `after/ftplugin/markdown/instant-markdown.vim` file from this repo into your `~/.vim/after/ftplugin/markdown/` (creating directories as necessary), or use pathogen.
- Ensure you have the line `filetype plugin on` in your `.vimrc`
- Open a markdown file in vim and enjoy!

###补充

按照Github上的介绍的步骤应该，貌似只要照着做就ok，出了错，去翻一翻issues，都能搞的定。

这里提几点需要注意的地方：

1. 你的 node.js 版本最好用最新版本，不然安装可能会出错，我安装失败就是这个原因。解决见： **安装最新node.js版本**
2. 确保你在`.vimrc`中设置了：`filetype plugin on`
3. 安装完成后在终端输入：`echo 'test message' |  instant-markdown-d `,浏览器能够自动打开，并显示 “test message”。说明你已经安装成功了。如果浏览器没有启动，手动在地址栏输入：http://localhost:8090/ 如果也能偶显示结果，那么也是正常的。否则退回第一步
4. 以上检查完毕后，打开 vim 编辑 markdown 文件，如果浏览器在http://localhost:8090/ 能够正常并实时显示你的内容，那么恭喜你，安装完成了。如果没有不要灰心。
5. 如果你的 Markdown 文件后缀是` .md` 那么很抱歉，vim 把它识别为 `Modula 2` 文件了，你可以通过`:set filetype`查看当前文件类型，如果结果显示不是`markdown`，那么这就是问题所在。解决见：**纠正vim探测错误文件类型**

##安装最新 node.js 版本
---------------------

添加ppa：

{% highlight bash  %}

sudo apt-get install python-software-properties
sudo apt-add-repository ppa:chris-lea/node.js
sudo apt-get update
{% endhighlight %}

安装 node.js

{% highlight bash %}
apt-get install nodejs  
{% endhighlight %}

查看版本：

{% highlight bash %}

➜  ~  > node -v
v0.10.26
➜  ~  > 
{% endhighlight %}

安装 npm：

正常情况下，安装完 node.js 后 npm 会随之自动安装。

查看 npm 版本：

{% highlight bash %}

➜  ~  > npm -v
1.4.3
➜  ~  > 
{% endhighlight %}

如果 npm 没有安装，则使用下面命令安装：

{% highlight bash %}

sudo apt-get install npm

{% endhighlight %}

ok,安装完毕！ 

##纠正 vim 探测错误文件类型
------------------------

这需要手动修改 filetype.vim 的配置。

我修改的位置是：`/usr/share/vim/vim74/filetype.vim`

修改两处：

1.找到 Modula 2

{% highlight bash %}
" Modula 2
" au BufNewFile,BufRead *.m2,*.DEF,*.MOD,*.md,*.mi setf modula2
au BufNewFile,BufRead *.m2,*.DEF,*.MOD,*.mi setf modula2
{% endhighlight %}

2.找到 markdown

{% highlight bash %}
" Markdown
" au BufNewFile,BufRead *.markdown,*.mdown,*.mkd,*.mkdn,*.mdwn,README.md setf markdown
au BufNewFile,BufRead *.markdown,*.mdown,*.mkd,*.mkdn,*.mdwn,README.md,*.md  setf markdown
{% endhighlight %}

ok,更正完毕！

Enjoy your writing !

[1]: https://github-camo.global.ssl.fastly.net/6e7dc465d334c2f962ad8c8bfee654d0e8da24ff/687474703a2f2f646c2e64726f70626f782e636f6d2f752f32383935363236372f696e7374616e742d6d61726b646f776e2d64656d6f5f7468756d622e676966
[2]: https://github.com/suan/vim-instant-markdown
