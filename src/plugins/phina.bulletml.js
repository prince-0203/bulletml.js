/**
 * @namespace
 */
phina.bulletml = phina.bulletml || {};

(function() {

phina.define("phina.bulletml.Bullet", {
    superClass: "phina.display.DisplayElement",

    init: function(runner) {
        this.superInit();
        this.fromJSON({
            children: {
                body: {
                    className: "phina.display.CircleShape",
                    arguments: {
                        fill: "hsl(0, 80%, 80%)",
                        stroke: "hsl(0, 80%, 50%)",
                        lineWidth: 2,
                        radius: 10
                    }
                }
            }
        });

        this.runner = runner;

        this.setPosition(this.runner.x, this.runner.y);
        this.runner.onVanish = function() {
            if (this.parent) this.remove();
        }.bind(this);
    },

    update: function() {
        this.runner.update();
        this.setPosition(this.runner.x, this.runner.y);
    }

});

phina.app.Object2D.prototype.startDanmaku = function(root, config) {
    config = (config || {}).$safe(bulletml.runner.DEFAULT_CONFIG);

    var runner = root.createRunner(config);
    runner.x = this.x;
    runner.y = this.y;
    var enterframeListener = function() {
        runner.x = this.x;
        runner.y = this.y;
        runner.update();
        this.setPosition(runner.x, runner.y);
    };
    enterframeListener.isDanmaku = true;
    this.on("enterframe", enterframeListener);

    return this;
};

phina.app.Object2D.prototype.stopDanmaku = function() {
    if (this.hasEventListener("enterframe")) {
        var copied = this._listeners["enterframe"].clone();
        for (var i = 0; i < copied.length; i++) {
            if (copied[i].isDanmaku) {
                this.off("enterframe", copied[i]);
            }
        }
    }

    return this;
};

})();
