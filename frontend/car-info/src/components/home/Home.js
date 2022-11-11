import React from 'react';
import logo from "../../assets/logo.jpg";
import "./home.scss";


function Home() {
  return (
    <div>
      <div className='card text-center'>
        <div>
        <img src={logo} alt="logo" className='logo_img'></img>
        <h1 className='card-header'>SiaraWagen</h1> 
        </div> 
        <div className='card-body'>
          <h1 className='card-title'>Helping millions buying their Dream car...</h1><br></br>

          <div className='row'>
            <div className='col-sm-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Decisive</h5>
                  <img src='https://careers.cardekho.com/images/delite-D.png' alt='image'/>                  
                    <div>
                    <p>Manager Calls for an urgent work while you are heading for a customer call. 
                      Be decisive to attend the customer first.</p>
                    </div>
                </div>
              </div>
            </div>
            
            <div className='col-sm-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Empathy</h5>
                  <img src='https://careers.cardekho.com/images/delite-EM.png' alt='image'/>
                  <div className='background'>
                    <div>
                    <p>Managers should not shout on people in public forum. Managers should understand the personal challenges faced by the staff.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-sm-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Lean</h5>
                  <img src='https://careers.cardekho.com/images/delite-L.png' alt='image'/>
                  <div className='background'>
                    <div>
                      <p>Are company expenses my expenses? Spend company money the way you spend your own without thinking twice.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Innovative</h5>
                  <img src='https://careers.cardekho.com/images/delite-I.png' alt='image'/>
                  <div className='background'>
                    <div>
                      <p>It is not about bringing in bigger changes but also any process improvement, reduction in cost.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-sm-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Trustworthy</h5>
                  <img src='https://careers.cardekho.com/images/delite-T.png' alt='image'/>
                  <div className='background'>
                    <div>
                      <p>Deliver to your comitment. Being honest &amp; open to colleagues.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-sm-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Excellent</h5>
                  <img src='https://careers.cardekho.com/images/delite-E.png' alt='image'/>
                  <div className='background'>
                    <div>
                      <p>Understand the customer better. Deliver to your inter department clients.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className='card-footer text-muted'>
          &copy; 2022 SiaraWagen
          <img className='comp_logo' src={logo} alt="logo"></img>          
        </div>
      </div>
    </div>
  )};
export default Home;
