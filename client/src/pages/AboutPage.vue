<template>
    <div class="container">
      <h1 align="center" class="title">About me!</h1>
      <p class="about-paragraph">
        <!-- Hi, we are Ido and Matan. We're both third-year Software and Information Systems Engineering students at Ben-Gurion University. Alongside our studies, we proudly served in the Iron Swords War, each completing over 150 days of reserve duty as fighters. Balancing our academic and military commitments has been challenging but incredibly rewarding. We're dedicated to excelling in our field while honoring our duty to our country. -->
        Hi, my name is ido Ido. I'm third-year Software and Information Systems Engineering student at Ben-Gurion University. Alongside my studies, I proudly served in the Iron Swords War, completing over 150 days of reserve duty as fighter. Balancing my academic and military commitments has been challenging but incredibly rewarding. I'm dedicated to excelling in my field while honoring my duty to our country. 

      </p>
      
      <hr />
  
      <b-row align="center">
        <b-col>
          <b-card id="info-about-us" bg-variant="light" class="text-center">
            <h3 class="dark-title">Ido Doron</h3>
            <br />
            <a href="https://www.linkedin.com/in/ido-doron1/">
              <img src="../assets/linkedin.jpg" alt="LinkedIn" class="social-image" />
            </a>
            <a href="https://github.com/idoDoron3">
              <img src="../assets/git.png" alt="GitHub" class="social-image" />
            </a>
          </b-card>
        </b-col>
  
        <!-- <b-col>
          <b-card id="info-about-us" bg-variant="light" class="text-center">
            <h3 class="dark-title">Matan Vaknin</h3>    
            <br />
            <a href="https://www.linkedin.com/in/matan-vaknin-313738234/">
              <img src="../assets/linkedin.jpg" alt="LinkedIn" class="social-image" />
            </a>
            <a href="https://github.com/MatanVak23">
              <img src="../assets/git.png" alt="GitHub" class="social-image" />
            </a>
          </b-card>
        </b-col> -->
      </b-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
  };
  </script>
  
  <style scoped>
  .container {
    font-family: "Raleway", sans-serif;
    text-align: center;
    padding: 20px;
    background: linear-gradient(to bottom right, #e0f7fa, #f1f8e9);
    border-radius: 8px;
  }
  
  .title {
    color: #333;
    font-size: 36px;
    margin-bottom: 24px;
    font-weight: 800;
  }
  
  .about-paragraph {
    font-size: 18px;
    color: #555;
    margin-bottom: 20px;
    line-height: 1.6;
    text-align: justify;
  }
  
  #info-about-us {
    width: 75%;
    margin: 0 auto 20px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .social-image {
    width: 42px;
    height: 42px;
    margin: 0 10px;
    transition: transform 0.2s;
  }
  
  .social-image:hover {
    transform: scale(1.1);
  }
  .dark-title {
    color: #333; /* Set the h3 color to dark */
  }
  </style>
  