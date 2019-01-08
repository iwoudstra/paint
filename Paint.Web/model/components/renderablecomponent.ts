﻿/// <reference path="../core/component.ts" />

class RenderableComponent extends Component {
    positionComponent: PositionComponent;
    width: number;
    height: number;
    color: string;

    constructor(positionComponent: PositionComponent, width: number, height: number, color: string) {
        super();

        this.positionComponent = positionComponent;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}