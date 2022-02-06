class GameManager {
    constructor(){
        this.player = new Mario(0,GROUNDPOS);
        this.score = 0;
        this.golds = [];
        this.monsters = [];
        this.level = new Level(0.0, -0.90);
        //this.objects = [];
        this.goldTimer = 100;
        this.monsterTimer = 70;
        this.gameOver = false;
    }
    init(){
        const gold = new Gold(0.0,0);
        const gold2 = new Gold(-0.5,0);
        this.golds.push(gold,gold2);
        const m = new Monster(Math.round(Math.random()));
        this.monsters.push(m);
    }


    // make new gold
    spawnGold(){
        if(this.goldTimer < 0){
            const g = new Gold(randRange(-0.9,0.9),0);
            this.golds.push(g);
            this.goldTimer = 100;
        }
    }

    spawnMonster(){
        if(this.monsterTimer < 0){
            const m = new Monster(Math.round(Math.random()));
            this.monsters.push(m);
            this.monsterTimer = 70;
        }
    }

    checkCollision(o){
        const t = 0.1 ; //bounding box tolerance for player
        if((this.player.pos.x + t) > o.bBox.ax &&
           (this.player.pos.y + t) > o.bBox.by &&
           (this.player.pos.y - t) < o.bBox.cy &&
           (this.player.pos.x - t) < o.bBox.dx)
            return true;
    }

    update(){
        if(this.gameOver) return;

        //gold stuff
        if(this.golds.length < 2) this.spawnGold();
        for(let i = 0; i < this.golds.length; i++){
            const g = this.golds[i];
            // console.log(g.bBox);
            if(g.lifeSpan < 0) this.golds.splice(g,1);
            if(this.checkCollision(g)){
                this.golds.splice(i,1);
                this.score++;
                const span = document.getElementById('score');
                span.textContent = ("Stig: " + this.score);
            }
            g.update();
        }

        //monster stuff
        if(this.monsters.length < 2) this.spawnMonster();
        for(let i = 0; i < this.monsters.length; i++){
            const m = this.monsters[i];
            if(this.checkCollision(m)){
                const span = document.getElementById('score');
                span.textContent = "Game Over";
                this.gameOver = true;
            }
            if((m.pos.x < -1.08 && m.dir === 0) ||
               m.pos.x > 1.08 && m.dir === 1){
                this.monsters.splice(i,1);
            }
            m.update()
        }

        this.player.update();
        this.level.update();
        this.goldTimer -= 1;
        this.monsterTimer -= 1;

    }


    render(){

        gl.clear(gl.COLOR_BUFFER_BIT);
        for(const g of this.golds){
            if(g) g.render();
        }
        for(const m of this.monsters){
            m.render();
        }
        this.player.render();
        this.level.render();
    }
}
