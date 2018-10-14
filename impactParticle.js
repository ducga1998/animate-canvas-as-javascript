function Sequence(obj) {
    Object.keys(obj).map(item => {
        setTimeout(obj[item], item)
    })
}
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
    add(vec) {
        this.x += vec.x
        this.y += vec.y
    }
    substract(vec) {
        this.x -= vec.x
        this.y -= vec.y
    }
    multiply(v) {
        if (v instanceof Vector) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }
    // convert deg => rad
    static deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
 // convert rad => deg
    static rad2deg(rad) {
        return rad * (180 / Math.PI);
    }
    static fromAngle(deg  , radius) {
        return new Vector(radius * Math.cos(this.deg2rad(deg)), radius * Math.sin(this.deg2rad(deg)));
    }
    static randomRange(from, to) {
        return from + Math.random() * (to - from);
    }

}
class Particle {
    constructor(canvas, x, y, R, props ) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        // this.vector = new Vector(x ,y)
        this.pos = new Vector(x, y)
        this.count = 0
        this.life = 1
        this.R = R
        this.size = Vector.randomRange(props.size / 2, props.size);
        this.angle = Vector.randomRange(props.angle - props.spread / 2, props.angle + props.spread / 2);
        this.speed = Vector.randomRange(props.speed * 1.1, props.speed / 1.1);
        this.vel = Vector.fromAngle(this.angle, this.speed);
        this.props = {
            ...props, ...{
                life: 1
            }
        }
    }
    loop() {
        if (this.y === window.innerHeight) {
            this.y = 0
            console.log("ahhi")
        }
        this.render()
        this.cosPosition()
    }
    clearRect(){
        this.context.clearRect(0 ,0 , this.canvas.width,  this.canvas.height)
    }
    render() {
        // herre , particle render, we handle algo here
        // this.life = Math.max(0, this.life - this.props.fade / 1000);
        this.R = this.R * this.life
        // if (this.pos.x > 1000 || this.pos.x <= 0) this.vel.x *= 200 || 0;
        if (this.pos.y + this.R > 800 || this.pos.y + this.R <= 200) {this.vel.y *= -1}
        if(this.pos.x  + this.R<=200 || this.pos.x + this.R >=1300) {
            this.vel.x *= -1
        }
        this.pos.add(this.vel)
        this.context.beginPath()
        // this.context.clearRect( 0 , 0 , this.con)
        this.context.fillStyle = 'black'
       
        this.context.arc(this.pos.x, this.pos.y, this.R , 0, 360);

        this.context.fill();
    }
    setForce(vec) {
        // this.
        this.pos.add(vec)
    }
    
}
// factorry Particle : ))
// mnơi tạo ra bóng 
class Tween {
    constructor(canvas, x, y , props ) {
        this.canvas = canvas;
        this.context =canvas.getContext('2d')
        this.x = x
        this.y = y
        this.particles = []
        this.emti = true
        
        this.props = Object.assign(
            {
                size: 200,
                count: 4,
                rate: 50,
                speed: 4,
                fade: 3,
                invert: 1,
                angle: -100,
                spread: 15,
                bounceX: 1,
                bounceY: 1,
                windAngle: 0,
                windSpeed: 0.03
            }, props
        )
    }
    createParticle() {
        const R = Math.random() * 100
        if(this.emti){
            const instanceParticle = new Particle(this.canvas, this.x, this.y, R , this.props)
        this.particles.push(instanceParticle)
        }
    }
    init() {
        this.createParticle()
    }
    run() {
        let count = 0
        this.particles.map(item => {
            item.render()
        })
    }
    // detect impact 
    detectImpact( p1, p2){
        const distance =  ((p1.pos.x - p2.pos.x) **2 + (p2.pos.y -p1.pos.y)**2) **(1/2)
        if(distance < (p1.R + p2.R)) {
           p1.pos.multiply(new Vector(-1, -1))
           p2.pos.multiply(new Vector(-1 ,-1))
        }
    }
    changePositionAllParticle() {
        // console.log('run')
        this.context.clearRect(0 , 0 , this.canvas.width, this.canvas.height)
        this.particles.map(particle => {
            particle.pos.add(new Vector(0, 10))
            // particle.clearRect()
            particle.setForce(Vector.fromAngle(this.props.windAngle, this.props.windSpeed));
            particle.render()   
        })
        
    }
    changeWhenTime1000ms(){
        this.particles.map(p => {
            p.setForce(new Vector(10 , -33))
        })
    }



}
const canvas = document.getElementById('canvas')
const instanceTween = new Tween(canvas, 1000, 300 , {
		"size": 1,
		"count": 1,
		"rate": 10000,
		"speed": 2,
		"fade": 2, // vecticole small animate
		"angle": -90, // goc tha 
		"spread": 400,  // lan tran 
		"bounceX": 100,
		"bounceY": -0.5,
		"windAngle": 120,
		"windSpeed": 0.1,
		invert: 0
	
})
Sequence({
    0: (function draw() {
        instanceTween.init()
        requestAnimationFrame(draw)
    })(),
    2000: () => {
        instanceTween.run()
        instanceTween.emti = false
    },
    3000: function change () {
      instanceTween.changePositionAllParticle()
     requestAnimationFrame(change)
    },
    // 7000 : function checkImpact()  {
    //     // console.log('7000')
    //    for(let i = 0 ; i < instanceTween.particles.lenght ; i++) {
    //         for(let j = 0 ; j< instanceTween.particle.lenght; j++) {
    //             if(i !== j ){
    //                 instanceTween.detectImpact(instanceTween.particle[i], instanceTween.particles[j])
    //             }
    //         }
      
    //    }
    //    requestAnimationFrame(checkImpact)
    // }
    // 10000 :() => {
    //     console.log('10000 ms')
    //     instanceTween.changeWhenTime1000ms()
    // }
})