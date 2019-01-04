﻿/// <reference path="../core/component.ts" />

class MoveableComponent extends Component {
    velocity: Vector2d = new Vector2d(0, 0);
    positionComponent: PositionComponent;

    constructor(positionComponent: PositionComponent) {
        super();

        this.positionComponent = positionComponent;
    }
}