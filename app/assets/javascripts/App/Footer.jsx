import React from 'react';

import View from '../Components/View';

export default () => {
  return (
    <footer>
			<View className='container'>
			<View>
				<nav>
					<strong>EDC</strong>
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/explore">Explore</a></li>
						<li><a href="/browse">Gear</a></li>
						<li><a href="/advertise">Advertise</a></li>
					</ul>

					<View id='copyright'>&copy; Everyday Carry {new Date().getFullYear()}</View>
				</nav>
				<nav>
					<strong>Features</strong>
					<ul>
						<li><a href="/tagged/carry-smarter">Carry Smarter</a></li>
						<li><a href="/tagged/reviews">Reviews</a></li>
						<li><a href="/tagged/buying-guides">Buying Guides</a></li>
						<li><a href="/tagged/interviews">People & Places</a></li>
					</ul>
				</nav>
				<nav>
					<strong>About</strong>
					<ul>
						<li><a data-no-instant href="/about">Our Team</a></li>
						<li><a href="/help/privacy">Privacy Policy</a></li>
						<li><a href="/help/terms">Terms & Conditions</a></li>
						<li><a href="/help">Contact Us</a></li>
					</ul>
				</nav>
				<nav>

					<strong>Follow Us</strong>
          <View className="social-links">
            <a target="_blank" href="https://www.facebook.com/everydaycarry"><i className="fa fa-facebook"></i><span>Facebook</span></a>
            <a target="_blank" href="http://www.pinterest.com/everydaycarry/pocket-dump/"><i className="fa fa-pinterest"></i><span>Pinterest</span></a>
            <a target="_blank" href="http://instagram.com/everydaycarry/"><i className="fa fa-instagram"></i><span>Instagram</span></a>
            <a target="_blank" href="http://twitter.com/everydaycarry"><i className="fa fa-twitter"></i><span>Twitter</span></a>
            <strong style={{ margin: '0', fontSize: '100%'}}>RSS / Feedly</strong>
            <a target="_blank" href="http://everyday-carry.com/rss"><i className="fa fa-rss"></i><span>RSS</span></a>
            <a href='http://cloud.feedly.com/#subscription%2Ffeed%2Fhttp%3A%2F%2Feveryday-carry.com%2Frss'  target='_blank'>
              <img id='feedlyFollow' src='//s3.feedly.com/img/follows/feedly-follow-circle-flat-white_2x.png' alt='follow us in feedly' width='71' height='28' />
            </a>
          </View>


				</nav>

				<View className='clear'></View>
			</View>
			</View>
		</footer>
  );
}
