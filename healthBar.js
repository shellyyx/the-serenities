window.HealthBar = class HealthBar {
    constructor(scene, player, newStats ) {
        this.scene = scene;
        this.player = player;
        this.playerStats = newStats;
        this.maxHealth = newStats.maxHealth;
        this.currentHealth = newStats.currentHealth;
    
        // Constants for the health bar appearance
        this.width = 80;
        this.height = 8;
        this.borderThickness = 2;
        this.yOffset = -100; // Position above player
    
        this.createHealthBar();
    
        this.updateHealth(this,this.playerStats.currentHealth,this.playerStats.maxHealth);
    }
  
    createHealthBar() {
      // Create a container for the health bar components
      this.bar = this.scene.add.group();
  
      // Create border (black outline)
      this.border = this.scene.add.rectangle(
        0,
        0,
        this.width + this.borderThickness * 2,
        this.height + this.borderThickness * 2,
        0x000000
      );
  
      // Create background (gray)
      this.background = this.scene.add.rectangle(
        0,
        0,
        this.width,
        this.height,
        0x808080
      );
  
      // Create health indicator (green)
      this.healthIndicator = this.scene.add.rectangle(
        -this.width / 2,
        0,
        this.width,
        this.height,
        0x00ff00
      );
      this.healthIndicator.setOrigin(0, 0.5);
  
      // Add components to the container
      this.bar.add(this.border);
      this.bar.add(this.background);
      this.bar.add(this.healthIndicator);
  
      // Set initial position
      this.updatePosition();
    }
  
    updatePosition() {
      // Position the health bar above the player
      if (this.player && this.player.body) {
        const x = this.player.x;
        const y = this.player.y + this.yOffset;
  
        this.border.setPosition(x, y);
        this.background.setPosition(x, y);
        this.healthIndicator.setPosition(x - this.width / 2, y);
      }
    }
  
    updateHealth(context, health, maxHealth) {
      // Update current health value
      context.currentHealth = Phaser.Math.Clamp(health, 0, maxHealth);
  
      // Calculate health bar width based on current health percentage
      const healthPercentage = health / maxHealth;
      const barWidth = context.width * healthPercentage;
  
      // Debug log
      console.log(
        "Health bar updated:",
        health,
        "/",
        maxHealth,
        "Percentage:",
        healthPercentage,
        "Width:",
        barWidth
      );
  
      // Update the health indicator width
      context.healthIndicator.width = barWidth;
  
      // Change color based on health percentage
      if (healthPercentage > 0.6) {
        // Green when health is above 60%
        context.healthIndicator.fillColor = 0x00ff00;
      } else if (healthPercentage > 0.3) {
        // Yellow when health is between 30% and 60%
        context.healthIndicator.fillColor = 0xffff00;
      } else {
        // Red when health is below 30%
        context.healthIndicator.fillColor = 0xff0000;
      }
  
      // Force a redraw of the health bar
      context.healthIndicator.setSize(barWidth, context.height);
    }
  
    // update(enemy) {
    //   // Update position to follow the player
    //   this.updatePosition();
  
    //   // Sync health with playerStats if it has changed
    //   if (
    //     this.playerStats &&
    //     this.currentHealth !== this.playerStats.currentHealth
    //   ) {
    //     this.updateHealth(this.playerStats.currentHealth);
    //   }
    // }

    startEnemyUpdater(enemy, context, hpbarContext) {
        function updateLoop() {
          // Stop if enemy is gone or inactive
          if (!enemy || !enemy.active){
            //cleaing hp bar if it still exist
            if(hpbarContext){
              hpbarContext.destroy(hpbarContext);
            }
            return;
          } 
      
          // Update position to follow the player
          hpbarContext.updatePosition();
      
          // Sync health with playerStats if it has changed
          if (enemy.enemyStats){
            if(enemy.enemyStats.currentHealth !== enemy.enemyStats.maxHealth){
              hpbarContext.updateHealth(hpbarContext, enemy.enemyStats.currentHealth, enemy.enemyStats.maxHealth);
            }
          }else{
            //cleaing hp bar if it still exist
            if(hpbarContext){
              hpbarContext.destroy(hpbarContext);
            }
          }
      
          // Continue the loop on next animation frame
          requestAnimationFrame(updateLoop);
        }
      
        // Start the loop
        requestAnimationFrame(updateLoop);
      }
  
    destroy(context) {
      // Clean up the health bar
      context.bar.destroy(true);
    }
  };
  