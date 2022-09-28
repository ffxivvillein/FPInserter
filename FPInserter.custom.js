function FingerPrint(a, b) {
  this.a = a;
  if (!document.querySelector(this.a)) {
    return;
  }
  this.b = b;
  if (this.b == undefined) {
    this.b = {};
  }
  this.wm = null;
  this.wmState = null;
  this.ret = "";
  this.userData = this.b.userData || "123456789ABCDEF";
  this.video = this.b.video || ".vop-video";
  this.watermark = this.b.watermark || "#watermark";
  this.containerEl = null;
  this.videoEl = null;
  this.watermarkEl = null;
  this.init();
}
FingerPrint.prototype.init = function () {
  var _this = this;
  _this.wm = new window.CoreTrust.FPInserter();
  _this.wmState = window.CoreTrust.Enum.ErrorCode;
  _this.containerEl = document.querySelector(_this.a);
  _this.videoEl = _this.containerEl.querySelector(_this.video);
  _this.watermarkEl = _this.containerEl.querySelector(_this.watermark);
  _this.ret = _this.wm.initializeFP(
    _this.watermarkEl,
    _this.videoEl,
    _this.userData
  );
  console.log("gonabi::userData", _this.userData);
  if (_this.ret) {
    switch (
      _this.ret // initializeFP 실패한 경우
    ) {
      case _this.wmState.CTFP_ERROR_INVALID_DIV:
        break;
      case _this.wmState.CTFP_ERROR_INVALID_VIDEO:
        break;
      case _this.wmState.CTFP_ERROR_INVALID_DIV_RESOLUTION:
        break;
      case _this.wmState.CTFP_ERROR_INVALID_USERDATA:
        break;
      case _this.wmState.CTFP_ERROR_INVALID_USERDATA_LENGTH:
        break;
    }
    return;
  }
};
FingerPrint.prototype.start = function () {
  this.ret = this.wm.startFP();
  if (this.ret) {
    // startFP 실패한 경우
    return;
  }
};
FingerPrint.prototype.stop = function () {
  this.wm.stopFP();
};
FingerPrint.prototype.finalize = function () {
  this.wm.finalizeFP();
};
