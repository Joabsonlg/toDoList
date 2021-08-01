class Timer extends HTMLElement {
    constructor() {
        super()

        const shadow = attachShadow({mode: 'open'})

        let root = document.createElement('div')
        root.innerHTML = `
        <div class="content">
            <h1>Timer Component</h1>
           
            <button type="button" class="btn-circle active"> 5</i></button>
            <button type="button" class="btn-circle">15</i></button>
            <button type="button" class="btn-circle">25</i></button>
            
            <div class="base-timer">
                <svg
                    class="base-timer__svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <g class="base-timer__circle">
                    <circle
                        class="base-timer__path-elapsed"
                        cx="50"
                        cy="50"
                        r="45"
                    ></circle>
                    <path
                        :stroke-dasharray="circleDasharray"
                        class="base-timer__path-remaining"
                        :class="remainingPathColor"
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                      "
                    ></path>
                  </g>
                </svg>
                <span class="base-timer__label">{{ formattedTimeLeft }}</span>
              </div>
        </div>
        `
        const FULL_DASH_ARRAY = 283;
        const WARNING_THRESHOLD = 10;
        const ALERT_THRESHOLD = 5;
        const COLOR_CODES = {
            info: {
                color: "green",
            },
            warning: {
                color: "orange",
                threshold: WARNING_THRESHOLD,
            },
            alert: {
                color: "red",
                threshold: ALERT_THRESHOLD,
            },
        };

        let time = 0
        let timePassed = 0
        let timerInterval = null
        let isPaused = false

        function circleDasharray() {
            return `${(timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
        }

        function formattedTimeLeft() {
            const timeLeft = timeLeft;
            const minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            return `${minutes}:${seconds}`;
        }

        function timeLeft() {
            return time - timePassed;
        }

        function timeFraction() {
            const rawTimeFraction = timeLeft / time;
            return rawTimeFraction - (1 / time) * (1 - rawTimeFraction);
        }

        function remainingPathColor() {
            const {alert, warning, info} = COLOR_CODES;
            if (timeLeft <= alert.threshold) {
                return alert.color;
            } else if (timeLeft <= warning.threshold) {
                return warning.color;
            } else {
                return info.color;
            }
        }

        let param = getAttribute("param")

        const style = document.createElement('style')
        style.textContent = `
        .btn-circle {
            color: white;
            height: 80px;
            width: 80px;
            border-radius: 50%;
            border: 1px solid black;
            font-size: 2rem;
            cursor: pointer;
            box-shadow: -1px -1px 3px rgba(255, 255, 255, 0.1);
            2px 2px 6px rgba(0, 0, 0, 0.8);
            background-color: #363636;
        }
        .btn-circle:hover {
            box-shadow: -1px -1px 3px rgba(255, 255, 255, 0.1),
            2px 2px 6px rgba(0, 0, 0, 0.8),
            inset -2px -2px 10px rgba(255, 255, 255, 0.05),
            inset 2px 2px 10px rgba(0, 0, 0, 0.8);
        }
        .btn-circle.active {
            color: #00fff1;
            box-shadow: inset -1px -1px 3px rgba(255, 255, 255, 0.1),
            inset 2px 2px 6px rgba(0, 0, 0, 1);
            text-shadow: 0 0 5px #00fff1, 0 0 20px #00fff1;
        }
        
        
        .base-timer {
            position: relative;
            width: 300px;
            height: 300px;
            margin-left: auto;
            margin-right: auto;
        }
        .base-timer__svg {
            transform: scaleX(-1);
        }
        .base-timer__circle {
            fill: none;
            stroke: none;
        }
         .base-timer__path-elapsed {
            stroke-width: 7px;
            stroke: grey;
        }
        .base-timer__path-remaining {
            stroke-width: 7px;
            stroke-linecap: round;
            transform: rotate(90deg);
            transform-origin: center;
            transition: 1s linear all;
            fill-rule: nonzero;
            stroke: currentColor;
        }
        .base-timer__path-remaining.green {
            color: #41b883;
        }
        .base-timer__path-remaining.orange {
            color: orange;
        }
        .base-timer__path-remaining.red {
            color: red;
        }
        .base-timer__label {
            position: absolute;
            width: 300px;
            height: 300px;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
        }
        `

        shadow.appendChild(style)
        shadow.appendChild(root)
    }
}

customElements.define('p-timer', Timer)
