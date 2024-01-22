import torch
if torch.cuda.is_available():
    device = torch.device("cuda")
    print(f"Device name: {torch.cuda.get_device_name(0)}")
    print(f"Total memory: {torch.cuda.get_device_properties(device).total_memory / 1024**3:.1f} GB")
else:
    print("不支持显存")