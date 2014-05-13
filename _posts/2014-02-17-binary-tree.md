---
layout: post
title: "Binary Tree"
modified: 2014-02-17 13:43:45 +0800
tags: [tree]
categories: algorithm
image:
  feature: abstract-11.jpg
  credit: 生活需要不断的前进才能看到未来的曙光
  creditlink: 
comments: true
share: true
---
#<center>「第一期」第一次题目: 构建二叉树（Binary Tree）</center>
<center>(链表存储方式)</center>
------

##一、前言  

   前段时间在V2ex看见V友发帖说大家一起学算法，刚好对了我的想法，于是乎立马就加入了。现在是一个小团队，人数不多，但是大家都很厉害。团队使用[**Teambition**](www.teambition.com)管理，在微信上交流，并在[**github**](https://github.com/kehr/learn-algorithm)建立了代码仓库，存放每个人的代码，供大家相互学习和借鉴。

计划每周两题，分期举行，项目发起者是**[代码家](http://daimajia.com/)**。以后我会把每一期的题目和代码都记录下来，写出分析和思考，并附上其它成员的代码链接。第一期完成时网站还没建好，本次就直接上题目和代码。
       
附上项目地址：[Learn-Algorithm](https://github.com/kehr/Learn-Algorithm)

##二、题目    


第一期第一次题目: 构建二叉树(链表存储方式)  

数据结构：    
{% highlight c++ %}
typedef struct BiTNode  
{   
    char item;   
    struct BiTNode *lChild,*rChild;   
}BiTNode,*BiTree;  
{% endhighlight %}

要求: 实现二叉树的基本操作  

CreateBiTree(BiTree &T) 按先序次序输入二叉树中节点的值,空格字符表示空树 最终创建二叉树  
PreOrderTraverse(BiTree T) 先序遍历树,输出节点中的字符  
InOrderTraverse(BiTree T) 中序遍历二叉树,输出节点中的字符  
PostOrderTraverse(BiTree T) 后序遍历儿二叉树,输出节点中的字符  
LevelOrderTraverse(BiTree T) 层序遍历二叉树,输出节点中的值  

提交时间:2014-2-16日(周日)晚12点前  
    
语言选择: C > C++ > Java > 其他  

##三、代码实现  
  
C++实现  

```cpp

/*************************************************************************
 * @File Name:    binarytree.cpp
 * @Author:       kehr
 * @Mail:         kehr.china@gmail.com
 * @Created Time: Wed 12 Feb 2014 
 * @Copyright:    GPL 2.0 applies
 * @Description:  实现二叉树的基本操作,C++实现。广度优先搜索使用STL队列实现
 *
 *  1. CreateBiTree(BiTree &T) 按先序次序输入二叉树中节点的值,空格字符表示空树 最终创建二叉树
 *  2. PreOrderTraverse(BiTree T) 先序遍历树,输出节点中的字符
 *  3. InOrderTraverse(BiTree T) 中序遍历二叉树,输出节点中的字符
 *  4. PostOrderTraverse(BiTree T) 后序遍历儿二叉树,输出节点中的字符
 *  5. LevelOrderTraverse(BiTree T) 层序遍历二叉树,输出节点中的值 
 *  6. Data Structure:
 *  typedef struct BiTNode
 *  { 
 *      char item; 
 *      struct BiTNode lChild,rChild; 
 *  }BiTNode,*BiTree;
 *      
 *************************************************************************/
#include <stdlib.h>

#include <iostream>
#include <queue>

using namespace std;

//定义树节点
typedef struct BiTNode
{
    char item;
    struct BiTNode *lChild,*rChild;
}BiTNode,*BiTree;

void CreateBiTree(BiTree &T);           //创建二叉树
void PreOrderTraverse(BiTree T);        //先序遍历
void InOrderTraverse(BiTree T);         //中序遍历
void PostOrderTraverse(BiTree T);       //后序遍历
void LevelOrderTraverse(BiTree T);      //广度优先遍历


int main()
{
    BiTree tree;

    cout << "创建二叉树：";
    CreateBiTree(tree);
    cout << "\n-------------------" << endl;
    
    cout << "先序遍历： ";
    PreOrderTraverse(tree);
    cout << "\n-------------------" << endl;
    
    cout << "中序遍历： ";
    InOrderTraverse(tree);
    cout << "\n-------------------" << endl;
    
    cout << "后序遍历： ";
    PostOrderTraverse(tree);
    cout << "\n-------------------" << endl;

    cout << "广度优先遍历遍历： ";
    LevelOrderTraverse(tree);
    cout << "\n-------------------" << endl;
    
    return 0;
}

void CreateBiTree(BiTree &T)
{
    char citem;
    
    cin.get(citem);

    if (' ' == citem)
    {
        cout << "\n该节点为空！" << endl;
        T = NULL;
    }
    else
    {
        if ((T = (BiTree)malloc(sizeof(BiTNode))) == NULL)
        {
            cout << "Memory allocation failure !" << endl;
            exit(1);
        }

        T->item = citem;
        
        cout << "\n创建左子树：" << citem << endl;
        CreateBiTree(T->lChild);
        
        cout << "\n创建右子树:" << citem << endl;
        CreateBiTree(T->rChild);
    }

}
void PreOrderTraverse(BiTree T)
{

    if(T != NULL )
    {
        cout << T->item << " ";
        PreOrderTraverse(T->lChild); // 遍历左子树
        PreOrderTraverse(T->rChild);// 遍历右子树
    }
}
void InOrderTraverse(BiTree T)
{

    if(T != NULL )
    {
        PreOrderTraverse(T->lChild);
        cout << T->item << " ";
        PreOrderTraverse(T->rChild);
    }
}
void PostOrderTraverse(BiTree T)
{

    if(T != NULL)
    {
        PreOrderTraverse(T->lChild);
        PreOrderTraverse(T->rChild);
        cout << T->item << " ";
    }
}
void LevelOrderTraverse(BiTree T)
{

    queue<BiTree> nodes;        //使用STL队列实现
    BiTree node;
 
    nodes.push(T);              //存放树根
 
    while (!nodes.empty())
    {
        node = nodes.front();   //获取队首元素节点
        cout << node->item << " ";
     
        nodes.pop();            //删除对首元素节点
        
        if (node->lChild)       //左节点入队
        {
            nodes.push(node->lChild);
        }
     
        if (node->rChild)       //右节点入队
        {
            nodes.push(node->rChild);
        }
     
    }
}
```

测试：  

<figure>
    <center>	
        <a href="#"><img src="/images/blog/binarytree.png" alt="binary tree"></a>
        	<figcaption>binary tree</figcaption>
    </center>
</figure>
输入：124##5##36##7##    

`#`代表空格  

输出：  

{% highlight sh %}

➜  first_time  > ./binarytree 
创建二叉树：124  5  36  7   

创建左子树：1

创建左子树：2

创建左子树：4

该节点为空！

创建右子树:4

该节点为空！

创建右子树:2

创建左子树：5

该节点为空！

创建右子树:5

该节点为空！

创建右子树:1

创建左子树：3

创建左子树：6

该节点为空！

创建右子树:6

该节点为空！

创建右子树:3

创建左子树：7

该节点为空！

创建右子树:7

该节点为空！

-------------------
先序遍历： 1 2 4 5 3 6 7 
-------------------
中序遍历： 2 4 5 1 3 6 7 
-------------------
后序遍历： 2 4 5 3 6 7 1 
-------------------
广度优先遍历遍历： 1 2 3 4 5 6 7 
-------------------
➜  first_time  > 
{% endhighlight %}
##四、参考  

其它人的代码还没整理出来，不过在[Learn-Algorithm](https://github.com/kehr/Learn-Algorithm)可以看得见所有的版本。

