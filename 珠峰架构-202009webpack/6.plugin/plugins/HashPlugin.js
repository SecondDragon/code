
/**
 * hash 每次编译都会产生一个hash值 整个项目只要有一个文件发生了轻微的改变,hash就会改变
 * chunkHash 代码块hash 每一个chunk都有自己的hash值, 每个入口的文件变化只会影响自己的代码块hash
 * contentHash 内容hash 跟内容有关,只要内容不变,它就不变
 * 
 * 
 */
class HashPlugin{
    apply(compiler){
        compiler.hooks.compilation.tap('HashPlugin',(compilation)=>{
            compilation.hooks.afterHash.tap('HashPlugin',()=>{
                //webpack把hash值放在了compilation.hash属性上.
                //compilation.hash = 'hash';
                //拿到本次编译的所有的代码块
                let chunks = compilation.chunks;
                for(let chunk of compilation.chunks){
                    //每个代码块hash计算结果会放在chunk.renderedHash属性里
                    chunk.renderedHash = chunk.name+'_chunkHash';
                    //每个代码块的contentHash就放在chunk.contentHash里
                    chunk.contentHash = {'javascript':'contentHash'};
                }
            });
        });
    }
}

module.exports = HashPlugin;