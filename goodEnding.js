class goodEnding extends Phaser.Scene {
  constructor() {
    super("goodEnding");
  }

  reset_checkpoint() {
    window.lastCheckpointX = null;
    window.lastCheckpointY = null;
  }

  reset_stats(wipeCheckpoint) {
    window.heart = 100;
    window.score = 0;
    window.memoryDisk = 0;
    updateInventory.call(this);

    if (wipeCheckpoint) {
      this.reset_checkpoint();
    }
  }

  preload() {
    // Load the ending image
    this.load.image("goodEndingImg", "assets/66.jpg");
    this.load.image("steamPage", "assets/newCTA.png");
    this.load.spritesheet("CTAScreenSheet", "assets/CTAScreenSpritesheet.png", {
        frameWidth: 1536,
        frameHeight: 864
    });
  }

  create() {
    console.log("*** good ending scene");
    this.scene.bringToTop("goodEnding");
    
    // Display the good ending image
    const goodEndingImage = this.add.image(0, 0, 'goodEndingImg').setOrigin(0, 0);
    
    // Optional: Add a "Play Again" button at the bottom of the screen
    const playAgainText = this.add.text(
      this.cameras.main.width / 2, 
      this.cameras.main.height - 100, 
      'NEXT', 
      {
        fontSize: '35px',
        fontFamily: '"Press Start 2P"',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        padding: {
          x: 20,
          y: 10
        }
      }
    )
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });
    
    // Add hover effect
    playAgainText.on('pointerover', () => {
      playAgainText.setTint(0xc274ff);
    });
    
    playAgainText.on('pointerout', () => {
      playAgainText.clearTint();
    });
    
    // Add click handler to return to main menu
    playAgainText.on('pointerdown', () => {
        console.log("steam page button clicked");
        this.steamPage()
        playAgainText.setInteractive(false);
      });
  }

  steamPage(){
    // Display the good ending image
    const goodEndingImage = this.add.image(0, 0, 'steamPage').setOrigin(0, 0);

    // const cta = this.add.sprite(768, 432, "CTAScreenSheet");
    // this.anims.create({
    //     key: "CTAScreen",
    //     frames: [
    //         ...this.anims.generateFrameNumbers("CTAScreenSheet", { start: 0, end: 149 }),
    //         ...this.anims.generateFrameNumbers("CTAScreenSheet", { start: 148, end: 27 }) // reversed, excluding 149 & 0 to avoid double frames
    //     ],
    //     frameRate: 15,
    //     repeat: -1
    // });

    // cta.play("CTAScreen");

    // create steam link page
    const steamOpenButton = this.add.text(
      this.cameras.main.width / 2, 
      this.cameras.main.height - 100, 
      'DOWNLOAD', 
      {
        fontSize: '35px',
        fontFamily: '"Press Start 2P"',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        padding: {
          x: 20,
          y: 10
        }
      }
    )
    .setOrigin(1.05,2.8)
    .setInteractive({ useHandCursor: true });

    // Add hover effect
    steamOpenButton.on('pointerover', () => {
      steamOpenButton.setTint(0xc274ff);
    });
    
    steamOpenButton.on('pointerout', () => {
      steamOpenButton.clearTint();
    });

    steamOpenButton.on('pointerdown', () => {
      window.open("https://store.steampowered.com/", "_blank");
    });
    
    // Optional: Add a "Play Again" button at the bottom of the screen
    const playAgainText = this.add.text(
      this.cameras.main.width / 2, 
      this.cameras.main.height - 100, 
      'PLAY AGAIN', 
      {
        fontSize: '35px',
        fontFamily: '"Press Start 2P"',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        padding: {
          x: 20,
          y: 10
        }
      }
    )
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });
    
    // Add hover effect
    playAgainText.on('pointerover', () => {
      playAgainText.setTint(0xc274ff);
    });
    
    playAgainText.on('pointerout', () => {
      playAgainText.clearTint();
    });
    
    // Add click handler to return to main menu
    playAgainText.on('pointerdown', () => {
        console.log("Back to main menu clicked");
        this.reset_stats(true); 
        updateInventory(true);
        this.scene.start("main");
      });
  }
}