class ProgressBar extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.initCanvas();
    this.updateCanvas();

  }

  initCanvas () {
    this.canvas.width = parseInt(getComputedStyle(this.canvas).width.slice(0, -2), 10);
    this.canvas.height = parseInt(getComputedStyle(this.canvas).height.slice(0, -2), 10);
    this.canvasContext = this.canvas.getContext('2d');

  }

  drawCircle (color, x, y, radius, finishAngle = Math.PI * 2) {
      this.canvasContext.beginPath();
      this.canvasContext.strokeStyle = color;
      this.canvasContext.lineWidth = 7;
      this.canvasContext.arc(x, y, radius, 0, finishAngle);
      this.canvasContext.stroke();

  }

  getAngle () {
    let {total, completed} = this.props;
    console.log(completed);
    console.log(total);
    return (completed - 1) / (total - 1) * Math.PI * 2
  }

  componentWillReceiveProps() {
    this.updateCanvas();
  }

  getPercent () {
    return Math.round((this.props.completed - 1) / (this.props.total - 1) * 100 )
  }

  drawText (x, y) {
    let text = `${this.getPercent()}%`;
    x = x - text.length * 9.25;
    y = y + 10;

    this.canvasContext.fillStyle = '#ccc';
    this.canvasContext.font = 'bold 30px sans-serif';
    this.canvasContext.fillText(text, x, y)

  }

  updateCanvas () {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let x = this.canvas.width / 2;
      let y = this.canvas.height / 2;

      this.drawCircle('#4ca89a', x, y, 52);
      this.drawCircle('#96d6f4', x, y, 45, this.getAngle());
      this.drawText (x, y);

  }

  render() {
    return (
      <canvas id="progressCanvas" ref={elements => this.canvas = elements} className="progress" />
    );
  }
}
