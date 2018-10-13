
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
        // console
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

            
            // const newVector = new Vector(count, count)
            // item.setForce(newVector)
            item.render()
        })
    }
    changePositionAllParticle() {
        // console.log('run')

        this.context.clearRect(0 , 0 , this.canvas.width, this.canvas.height)
        this.particles.map(particle => {
            // particle.clearRect()
            particle.setForce(Vector.fromAngle(this.props.windAngle, this.props.windSpeed));
            // particle.setForce(new Vector(1 , 10))
            // particle.setForce(new Vector(  1 ,0))
            // console.log(particle.pos)
            // if(particle.pos.y > 800){
            //     console.log('ok')
            //     particle.pos.y = 0
            //     particle.pos.x = 1000
            // }
            particle.render()
            
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
    3000: (function change () {
          // instanceTween.emti = false
      instanceTween.changePositionAllParticle()
      requestAnimationFrame(change)
    })()
})