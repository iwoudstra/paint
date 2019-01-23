﻿/// <reference path="../core/system.ts" />

class RenderingSystem extends System {
    private requiredComponents: string[] = [RenderableComponent.name];

    public Update(deltaTime: number): void {
        var camera = <CameraComponent>this.engine.GetEntities([CameraComponent.name])[0].GetComponent(CameraComponent.name);
        var context = Game.Instance.context;
        context.clearRect(0, 0, Game.ResolutionWidth, Game.ResolutionHeight);

        var entities = this.engine.GetEntities(this.requiredComponents);
        for (var i = 0; i < entities.length; ++i) {
            var renderableComponent: RenderableComponent = <RenderableComponent>entities[i].GetComponent(RenderableComponent.name);
            if (renderableComponent.gameAnimation) {
                var extra = renderableComponent.orientationLeft ? renderableComponent.width : 0;

                context.translate(renderableComponent.positionComponent.position.x - camera.positionComponent.position.x + extra, renderableComponent.positionComponent.position.y - camera.positionComponent.position.y);

                if (renderableComponent.orientationLeft) {
                    context.scale(-1, 1);
                }
                context.drawImage(renderableComponent.gameAnimation.imageFile
                    , renderableComponent.gameAnimation.sourceX + (renderableComponent.gameAnimation.width * renderableComponent.frame)
                    , renderableComponent.gameAnimation.sourceY, renderableComponent.gameAnimation.width
                    , renderableComponent.gameAnimation.height
                    , 0
                    , 0
                    , renderableComponent.width
                    , renderableComponent.height
                );
                if (renderableComponent.orientationLeft) {
                    context.scale(-1, 1);
                }

                context.translate(-(renderableComponent.positionComponent.position.x - camera.positionComponent.position.x + extra), -(renderableComponent.positionComponent.position.y - camera.positionComponent.position.y));
            } else {
                context.beginPath();
                context.fillStyle = renderableComponent.color;
                context.strokeStyle = renderableComponent.color;
                context.fillRect(renderableComponent.positionComponent.position.x - camera.positionComponent.position.x, renderableComponent.positionComponent.position.y - camera.positionComponent.position.y, renderableComponent.width, renderableComponent.height);
            }
        }

        var texts = this.engine.GetEntities([TextComponent.name]);
        for (var i = 0; i < texts.length; ++i) {
            var text = <TextComponent>texts[i].GetComponent(TextComponent.name);
            context.fillStyle = '#ffffff';
            context.strokeStyle = '#000000';
            context.textAlign = 'center';
            context.font = '30pt Calibri';
            context.fillText(text.text, text.positionComponent.position.x - camera.positionComponent.position.x, text.positionComponent.position.y - camera.positionComponent.position.y);
            context.strokeText(text.text, text.positionComponent.position.x - camera.positionComponent.position.x, text.positionComponent.position.y - camera.positionComponent.position.y);

            context.fill();
            context.stroke();
        }

        var texts = this.engine.GetEntities([TopTextComponent.name]);
        for (var i = 0; i < texts.length; ++i) {
            var topText = <TopTextComponent>texts[i].GetComponent(TopTextComponent.name);
            context.fillStyle = '#ffffff';
            context.strokeStyle = '#000000';
            context.textAlign = 'center';
            context.textBaseline = 'top';
            context.font = '20pt Calibri';

            var splitText = topText.text.split('\n');
            for (var j = 0; j < splitText.length; ++j) {
                context.fillText(splitText[j].toUpperCase(), Game.ResolutionWidth / 2, 5 + (35*j));
                context.strokeText(splitText[j].toUpperCase(), Game.ResolutionWidth / 2, 5 + (35 * j));
            }

            context.fill();
            context.stroke();
        }
    }
}