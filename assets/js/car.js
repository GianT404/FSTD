class Car {
    constructor(x = width/2, y = height/2, angle = 10) {
      this.turnRateStatic = 0.1;            // The normal turning-rate (static friction => not sliding)
      this.turnRateDynamic = 0.08;          // The turning-rate when drifting
      this.turnRate = this.turnRateStatic;  // initialise turn-rate
      this.gripStatic = 2;                  // sliding friction while gripping
      this.gripDynamic = 0.5;               // sliding friction while drifting
      this.DRIFT_CONSTANT = 10;              // sets the x-velocity threshold for no-drift <=> drift. Lower = drift sooner
  
      // Physical properties
      this.d = createVector(x, y);          // displacement (position)
      this.v = createVector(0,0);           // velocity (world-referenced)
      this.a = createVector(0,0);           // acceleration (world-referenced)
      this.angle = angle;                   // heading - the direction the car faces
      this.m = 5;                          // mass
      this.w = 20;                          // width of body (for animation)
      this.l = 60;                          // length of body (for animation)
      this.f = 0.15;                        // Acceleration / braking force
      this.isDrifting = false;              // Drift state    
    }
    
  
    getPos() {
      return this.d.copy();
    }
    isDrift() {
      return this.isDrifting;
    }
  
  
    show() {
      push();
      translate(this.d.x, this.d.y);
      rotate(this.angle);
  
       // Draw Lamborghini-style car shape
       fill(255, 0, 0); // Red color
       beginShape();
       vertex(-this.w / 2, -this.l / 6); // Front left corner
       vertex(-this.w / 4, -this.l / 2); // Front windshield
       vertex(this.w / 4, -this.l / 2); // Front windshield
       vertex(this.w / 2, -this.l / 6); // Front right corner
       vertex(this.w / 2, this.l / 4); // Hood
       vertex(this.w / 4, this.l / 2); // Front right wheel arch
       vertex(-this.w / 4, this.l / 2); // Front left wheel arch
       vertex(-this.w / 2, this.l / 4); // Roof
       endShape(CLOSE);
   
       fill(0); // Black color
       rect(-this.w / 4, -this.l / 4, this.w / 2, this.l / 2); // Main body
   
       fill(255); // White color
       ellipse(this.w / 3, this.l / 3, this.w / 4, this.l / 4); // Front right wheel
       ellipse(-this.w / 3, this.l / 3, this.w / 4, this.l / 4); // Front left wheel
       ellipse(this.w / 3, -this.l / 3, this.w / 4, this.l / 4); // Rear right wheel
       ellipse(-this.w / 3, -this.l / 3, this.w / 4, this.l / 4); // Rear left wheel
   
       pop();
    }
  
    update() {
      if (keyIsPressed) {
        if (keyIsDown(UP_ARROW)) {
          let bodyAcc = createVector(0, this.f);
          let worldAcc = this.vectBodyToWorld(bodyAcc, this.angle);
          this.a.add(worldAcc);
        }
        if (keyIsDown(DOWN_ARROW)) {
          let bodyAcc = createVector(0,-this.f);
          let worldAcc = this.vectBodyToWorld(bodyAcc, this.angle);
          this.a.add(worldAcc);
        }
        if (keyIsDown(LEFT_ARROW)) {
          this.angle -= this.turnRate;
  
        }
        if (keyIsDown(RIGHT_ARROW)) {
          this.angle += this.turnRate;
        }
      }
  
      let vB = this.vectWorldToBody(this.v, this.angle);
  
      let bodyFixedDrag;
      let grip;
      if ( abs(vB.x) < this.DRIFT_CONSTANT ) {
        // Gripping
        grip = this.gripStatic
        this.turnRate = this.turnRateStatic;
        this.isDrifting = false;
      } else {
        // Drifting
        grip = this.gripDynamic;
        this.turnRate = this.turnRateDynamic;
        this.isDrifting = true;
      }
      bodyFixedDrag = createVector(vB.x * -this.gripDynamic, vB.y * 0.05);
  
      // Rotate body fixed forces into world fixed and add to acceleration
      let worldFixedDrag = this.vectBodyToWorld(bodyFixedDrag, this.angle)
      this.a.add(worldFixedDrag.div(this.m)); // Include inertia
  
      // Physics Engine
      this.angle = this.angle % TWO_PI; // Restrict angle to one revolution
      this.v.add(this.a);
      this.d.add(this.v);
      this.a = createVector(0,0); // Reset acceleration for next frame
  
    }
    vectBodyToWorld(vect, ang) {
      let v = vect.copy();
      let vn = createVector(
        v.x * cos(ang) - v.y * sin(ang),
        v.x * sin(ang) + v.y * cos(ang)
      );
      return vn;
    }
  
    // World to body rotation
    vectWorldToBody(vect, ang) {
      let v = vect.copy();
      let vn = createVector(
        v.x * cos(ang) + v.y * sin(ang),
        v.x * sin(ang) - v.y * cos(ang)
      );
      return vn;
    }
  
  }