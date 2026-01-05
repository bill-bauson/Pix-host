AFRAME.registerComponent('mobile-look-fix', {
	init: function () {
		const lookControls = AFRAME.components['look-controls'].Component.prototype;
		const PI_2 = Math.PI / 2;

		lookControls.onTouchMove = function (t) {
			if (!this.touchStarted || !this.data.touchEnabled) return;

			const canvas = this.el.sceneEl.canvas;
			const deltaYaw = 2 * Math.PI * (t.touches[0].pageX - this.touchStart.x) / canvas.clientHeight * 0.5;
			const deltaPitch = 2 * Math.PI * (t.touches[0].pageY - this.touchStart.y) / canvas.clientHeight * 0.5;

			this.yawObject.rotation.y -= deltaYaw;
			this.pitchObject.rotation.x -= deltaPitch;
			this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.pitchObject.rotation.x));

			this.touchStart = { x: t.touches[0].pageX, y: t.touches[0].pageY };
		};
	}
});
