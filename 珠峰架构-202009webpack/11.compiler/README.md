

add ->  multiple|multiple + add
multiple -> NUMBER | NUMBER *  (add)

结合性错了

结合性
左结合
1+2+3

2*3*4


右结合
a=b=c


现在这种写法有一个本质的错误!!
运算符有结合性 乘法和除法 从左往右结合
加法和减法也是
本来我们的文法结构应该是这样的写
如果你的文法是这样的写的,就会结合性是正常的,计算顺序是从左往后算的
左递归?
2+3+4
((2+3)+4)
add ->  add|add+multiple
((2*3)*4)
multiple -> multiple|multiple*NUMBER

如果是如何写样写的,又会现左递归的问题 

如果改成这样,就不会出现左递归
但是结合性又不对了
2+3+4
(2+(3+4)) 计算顺序就错了
add ->  multiple|multiple+add
multiple -> NUMBER|NUMBER*multiple

//TODO 非常复杂的解决方案?



1. 如何解决左递归和结合性的问题?
2. 写一个命令行工具,你可以命令里实时输入表达式,然后计算结果输出 ,完美支持加减乘除和括号
3. 转换器 把jsx语法树转换成js语法树
4. 生成器 把js语法树重新生成源代码