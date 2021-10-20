
import React from "react";

function About() {
    return (
        <div className="about">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg">
                        <h1 class="font-weight-light">About</h1>
                        <br/>
                        <p class="aboutText">
                            CalSPEED, released by the California Public Utilities Commission (CPUC), empowers end-users with a professional-level, industry-standard testing tool to measure the quality and
                            speed of their residential fixed internet connection.
                            CalSPEED conducts a two-phase test including initial testing and results validation in order to ensure statistically significant measurements.
                            Test your upload speed, download speed, message delay (latency), and message delay variation (jitter) using CalSPEED.
                            The first two metrics measure your Internet usage experience, while the second two measure the voice quality of voice over IP technologies.
                            Results are uploaded to a public repository at CPUC to provide you with the ability to compare broadband coverage at your location with other areas in California.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;