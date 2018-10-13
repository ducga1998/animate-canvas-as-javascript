
// this is bong bong
/*
    input : context  , x, y
    output : canvas circle

*/
function Sequence(obj) {
    Object.keys(obj).map(item => {
        setTimeout(obj[item], item)
    })
}
class Vector {
    constructor(x , y) {
        this.x = x ;
        this.y = y
    }
    add(vec) {
        this.x += vec.x
        this.y += vec.y 
    }
    substract(vec){
        this.x -= vec.x
        this.y -= vec.y
    }

}
class Particle {
    constructor(context, x, y, R) {
        this.context = context
        this.vector = new Vector(x ,y)
        this.count = 0
        this.life  =1 
        this.R = R
    }
    loop() {
        if (this.y === window.innerHeight) {
            this.y = 0
            console.log("ahhi")
        }
        
        this.render()
        this.cosPosition()
    }
    render() {
       
        this.context.beginPath()
        this.context.fillStyle = 'black'
        this.context.arc(this.vector.x , this.vector.y , this.R, 0 , 360);
      
        this.context.fill();
    }
    setForce(vec) {
        this.vector.add(vec)
    }
}

// factorry Particle : ))
// mnơi tạo ra bóng 
class Tween {
    constructor(canvas ,  x , y ) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')
        this.x = x
        this.y = y
        this.particles = []
    }

    createParticle() {
        const R  = Math.random() * 100
        // console
        const instanceParticle = new Particle(this.context , this.x, this.y , R )
        this.particles.push(instanceParticle)
    }
    init() {
        console.log('run init !!!')
        setInterval(() => {
            this.createParticle()
        },100) 
    }
    run() {
            for(let i = 0 ;i< 10 ; i ++){
                this.createParticle()
            }
            let count = 0 
            this.particles.map(item => {
                count = count + 100 
                const newVector = new Vector( count , count )
                item.setForce(newVector)
                item.render()
            })
    }
    // runParabol() {
    //     let X = 150;
    //     let Y = X ** 2
    //     setInterval(() => {
    //         X = X ++
    //         const instanceParticle = new Particle(this.context, 1000 + X, 500 - Y, 2)
    //         instanceParticle.loop()
    //     }, 10)
    // }
    // cos() {
    // let X =1  ;
    //   setInterval(() => {
    //       X = X -0.1
    //    let  Y =500 - 400 * Math.cos(Math.abs(X) * Math.PI ); 
    //     console.log(X , Y)
    //    const instanceParticle = new Particle(this.context, X + 500, Y, 20)
    //    instanceParticle.loop()
    //   }, 10)
    // }
    // vadapVersion2() {
    //     let X = 0
    //     setInterval(() => {
    //         X++
            
    //         const instanceParticle = new Particle(this.context, X, X, 20)
    //       ra  instanceParticle.cosPosition()
    //         instanceParticle.render()
    //     },10)
    // }
    // vaDap() {
    //     let X = 0;
    //     let count = 0
    //     let  Y ;
    //     setInterval(() => {
    //         X++
    //         if( X < window.innerHeight) {
              
    //             Y   = X
    //         }
    //         else {
    //             count = count + 0.1
    //             Y =(2 * window.innerHeight -X + count **(9.5/6)  )
    //             // Y = Y -
    //             if(Y   > window.innerHeight) {
    //                 console.log('OK')
    //                 // X = window.innerHeight + 3
    //                 count = 0
    //             }
    //         }
    //         if(Y   === window.innerHeight) {
    //         }
    //         const instanceParticle = new Particle(this.context, X, Y, 20)
    //         instanceParticle.loop()
            
    //     }, 1)
    // }
    
    
}


const canvas = document.getElementById('canvas')
const instanceTween = new Tween( canvas , 200 , 200)
for(let i = 0 ; i< 10 ; i++){
    instanceTween.createParticle()
}
 
    

instanceTween.run()
// Sequence({
//     0 : () => {
//         instanceTween.init()
//     },
//     1000 : () => {
//         instanceTween.run()
//     },
//     2000 : () => {
//         console.log('2000')
//     }
// })