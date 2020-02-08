import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { App } from "../index";
import * as Renderer from "../renderer/renderScene";
import { KEYS } from "../keys";

// Unmount ReactDOM from root
ReactDOM.unmountComponentAtNode(document.getElementById("root")!);

const renderScene = jest.spyOn(Renderer, "renderScene");
beforeEach(() => {
  localStorage.clear();
  renderScene.mockClear();
});

describe("add element to the scene when mouse dragging long enough", () => {
  it("rectangle", () => {
    const { getByTitle, container } = render(<App />);
    // select tool
    const tool = getByTitle("Rectangle — R, 2");
    fireEvent.click(tool);

    const canvas = container.querySelector("canvas")!;

    // start from (30, 20)
    fireEvent.mouseDown(canvas, { clientX: 30, clientY: 20 });

    // move to (60,70)
    fireEvent.mouseMove(canvas, { clientX: 60, clientY: 70 });

    // finish (position does not matter)
    fireEvent.mouseUp(canvas);

    expect(renderScene).toHaveBeenCalledTimes(5);
    expect(renderScene.mock.calls[4][1]).toBeNull();
    const elements = renderScene.mock.calls[4][0];

    expect(elements.length).toEqual(1);
    expect(elements[0].type).toEqual("rectangle");
    expect(elements[0].x).toEqual(30);
    expect(elements[0].y).toEqual(20);
    expect(elements[0].width).toEqual(30); // 60 - 30
    expect(elements[0].height).toEqual(50); // 70 - 20
  });

  it("ellipse", () => {
    const { getByTitle, container } = render(<App />);
    // select tool
    const tool = getByTitle("Ellipse — E, 4");
    fireEvent.click(tool);

    const canvas = container.querySelector("canvas")!;

    // start from (30, 20)
    fireEvent.mouseDown(canvas, { clientX: 30, clientY: 20 });

    // move to (60,70)
    fireEvent.mouseMove(canvas, { clientX: 60, clientY: 70 });

    // finish (position does not matter)
    fireEvent.mouseUp(canvas);

    expect(renderScene).toHaveBeenCalledTimes(5);
    expect(renderScene.mock.calls[4][1]).toBeNull();

    const elements = renderScene.mock.calls[4][0];
    expect(elements.length).toEqual(1);
    expect(elements[0].type).toEqual("ellipse");
    expect(elements[0].x).toEqual(30);
    expect(elements[0].y).toEqual(20);
    expect(elements[0].width).toEqual(30); // 60 - 30
    expect(elements[0].height).toEqual(50); // 70 - 20
  });

  it("diamond", () => {
    const { getByTitle, container } = render(<App />);
    // select tool
    const tool = getByTitle("Diamond — D, 3");
    fireEvent.click(tool);

    const canvas = container.querySelector("canvas")!;

    // start from (30, 20)
    fireEvent.mouseDown(canvas, { clientX: 30, clientY: 20 });

    // move to (60,70)
    fireEvent.mouseMove(canvas, { clientX: 60, clientY: 70 });

    // finish (position does not matter)
    fireEvent.mouseUp(canvas);

    expect(renderScene).toHaveBeenCalledTimes(5);
    expect(renderScene.mock.calls[4][1]).toBeNull();

    const elements = renderScene.mock.calls[4][0];
    expect(elements.length).toEqual(1);
    expect(elements[0].type).toEqual("diamond");
    expect(elements[0].x).toEqual(30);
    expect(elements[0].y).toEqual(20);
    expect(elements[0].width).toEqual(30); // 60 - 30
    expect(elements[0].height).toEqual(50); // 70 - 20
  });

  it("arrow", () => {
    const { getByTitle, container } = render(<App />);
    // select tool
    const tool = getByTitle("Arrow — A, 5");
    fireEvent.click(tool);

    const canvas = container.querySelector("canvas")!;

    // start from (30, 20)
    fireEvent.mouseDown(canvas, { clientX: 30, clientY: 20 });

    // move to (60,70)
    fireEvent.mouseMove(canvas, { clientX: 60, clientY: 70 });

    // finish (position does not matter)
    fireEvent.mouseUp(canvas);

    expect(renderScene).toHaveBeenCalledTimes(5);
    expect(renderScene.mock.calls[4][1]).toBeNull();
    const elements = renderScene.mock.calls[4][0];

    expect(elements.length).toEqual(1);
    expect(elements[0].type).toEqual("arrow");
    expect(elements[0].x).toEqual(30);
    expect(elements[0].y).toEqual(20);
    expect(elements[0].points.length).toEqual(2);
    expect(elements[0].points[0]).toEqual([0, 0]);
    expect(elements[0].points[1]).toEqual([30, 50]); // (60 - 30, 70 - 20)
  });

  it("line", () => {
    const { getByTitle, container } = render(<App />);
    // select tool
    const tool = getByTitle("Line — L, 6");
    fireEvent.click(tool);

    const canvas = container.querySelector("canvas")!;

    // start from (30, 20)
    fireEvent.mouseDown(canvas, { clientX: 30, clientY: 20 });

    // move to (60,70)
    fireEvent.mouseMove(canvas, { clientX: 60, clientY: 70 });

    // finish (position does not matter)
    fireEvent.mouseUp(canvas);

    expect(renderScene).toHaveBeenCalledTimes(5);
    expect(renderScene.mock.calls[4][1]).toBeNull();
    const elements = renderScene.mock.calls[4][0];

    expect(elements.length).toEqual(1);
    expect(elements[0].type).toEqual("line");
    expect(elements[0].x).toEqual(30);
    expect(elements[0].y).toEqual(20);
    expect(elements[0].points.length).toEqual(2);
    expect(elements[0].points[0]).toEqual([0, 0]);
    expect(elements[0].points[1]).toEqual([30, 50]); // (60 - 30, 70 - 20)
  });
});

describe("do not add element to the scene if size is too small", () => {
  it("rectangle", () => {
    const { getByTitle, container } = render(<App />);
    // select tool
    const tool = getByTitle("Rectangle — R, 2");
    fireEvent.click(tool);

    const canvas = container.querySelector("canvas")!;

    // start from (30, 20)
    fireEvent.mouseDown(canvas, { clientX: 30, clientY: 20 });

    // finish (position does not matter)
    fireEvent.mouseUp(canvas);

    expect(renderScene).toHaveBeenCalledTimes(4);
    expect(renderScene.mock.calls[3][1]).toBeNull();
    const elements = renderScene.mock.calls[3][0];

    expect(elements.length).toEqual(0);
  });

  it("ellipse", () => {
    const { getByTitle, container } = render(<App />);
    // select tool
    const tool = getByTitle("Ellipse — E, 4");
    fireEvent.click(tool);

    const canvas = container.querySelector("canvas")!;

    // start from (30, 20)
    fireEvent.mouseDown(canvas, { clientX: 30, clientY: 20 });

    // finish (position does not matter)
    fireEvent.mouseUp(canvas);

    expect(renderScene).toHaveBeenCalledTimes(4);
    expect(renderScene.mock.calls[3][1]).toBeNull();
    const elements = renderScene.mock.calls[3][0];

    expect(elements.length).toEqual(0);
  });

  it("diamond", () => {
    const { getByTitle, container } = render(<App />);
    // select tool
    const tool = getByTitle("Diamond — D, 3");
    fireEvent.click(tool);

    const canvas = container.querySelector("canvas")!;

    // start from (30, 20)
    fireEvent.mouseDown(canvas, { clientX: 30, clientY: 20 });

    // finish (position does not matter)
    fireEvent.mouseUp(canvas);

    expect(renderScene).toHaveBeenCalledTimes(4);
    expect(renderScene.mock.calls[3][1]).toBeNull();
    const elements = renderScene.mock.calls[3][0];

    expect(elements.length).toEqual(0);
  });

  it("arrow", () => {
    const { getByTitle, container } = render(<App />);
    // select tool
    const tool = getByTitle("Arrow — A, 5");
    fireEvent.click(tool);

    const canvas = container.querySelector("canvas")!;

    // start from (30, 20)
    fireEvent.mouseDown(canvas, { clientX: 30, clientY: 20 });

    // finish (position does not matter)
    fireEvent.mouseUp(canvas);

    // we need to finalize it because arrows and lines enter multi-mode
    fireEvent.keyDown(document, { key: KEYS.ENTER });

    expect(renderScene).toHaveBeenCalledTimes(5);
    expect(renderScene.mock.calls[4][1]).toBeNull();
    const elements = renderScene.mock.calls[4][0];

    expect(elements.length).toEqual(0);
  });

  it("line", () => {
    const { getByTitle, container } = render(<App />);
    // select tool
    const tool = getByTitle("Line — L, 6");
    fireEvent.click(tool);

    const canvas = container.querySelector("canvas")!;

    // start from (30, 20)
    fireEvent.mouseDown(canvas, { clientX: 30, clientY: 20 });

    // finish (position does not matter)
    fireEvent.mouseUp(canvas);

    // we need to finalize it because arrows and lines enter multi-mode
    fireEvent.keyDown(document, { key: KEYS.ENTER });

    expect(renderScene).toHaveBeenCalledTimes(5);
    expect(renderScene.mock.calls[4][1]).toBeNull();
    const elements = renderScene.mock.calls[4][0];

    expect(elements.length).toEqual(0);
  });
});